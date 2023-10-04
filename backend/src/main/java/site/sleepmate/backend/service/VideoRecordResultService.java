package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.dto.SleepAndWakeUpTimeResponseDto;
import site.sleepmate.backend.dto.StartAndEndDateDto;
import site.sleepmate.backend.dto.TotalSleepDataResponseDto;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class VideoRecordResultService {
    private final VideoRecordRepository videoRecordRepository;
    private final SaveTimeService saveTimeService;
    private final TimeFormattingService timeFormattingService;

    public Integer getAllVideoCount(Long memberSeq, LocalDate sleepDate) {
        List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqAndSleepDate(memberSeq, sleepDate);
        return videoRecords.size();
    }

    // 자러간 시간, 일어난 시간, 총 잔 시간
    public TotalSleepDataResponseDto getTotalSleepData(Long memberSeq, LocalDate sleepDate) {
        List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTimeDesc(memberSeq, sleepDate);
        SleepAndWakeUpTimeResponseDto sleepAndWakeUpTimeResponseDto = saveTimeService.getSleepAndWakeupTime(memberSeq, sleepDate);

        Duration totalSleepTime = Duration.between(sleepAndWakeUpTimeResponseDto.getSleepTime(), sleepAndWakeUpTimeResponseDto.getWakeUpTime());

        return TotalSleepDataResponseDto.builder()
                .sleepTime(sleepAndWakeUpTimeResponseDto.getSleepTime())
                .wakeUpTime(sleepAndWakeUpTimeResponseDto.getWakeUpTime())
                .totalSleepTime(timeFormattingService.durationFormat(totalSleepTime))
                .build();
    }

    public Double getTimeToDouble(LocalTime sleepTime) {
        int hour = sleepTime.getHour();
        int minute = sleepTime.getMinute();

        // 분을 정수에서 소수로 변환합니다.
        double minuteAsDecimal = (double) minute / 60.0;

        return hour + minuteAsDecimal;
    }

    // memberSeq 넣으면 기록 시작한 날짜, 끝나는 날짜 출력
    public StartAndEndDateDto getStartAndEndDate(Long memberSeq){
        List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqOrderBySleepDateAsc(memberSeq);
        return new StartAndEndDateDto(videoRecords.get(0).getSleepDate(), videoRecords.get(videoRecords.size()-1).getSleepDate());
    }

    // 날짜 담기
    public List<LocalDate> getAllSleepDate(LocalDate startDate, LocalDate endDate) {
        List<LocalDate> datesBetween = new ArrayList<>();

        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            datesBetween.add(currentDate);
            currentDate = currentDate.plusDays(1); // 다음 날짜로 이동
        }

        for (LocalDate localDate : datesBetween) {
            System.out.println(localDate);
        }

        return datesBetween;
    }

    // 평균 잠시간 계산
    public LocalTime getAvgSleepTime(Long memberSeq, LocalDate sleepDate, List<LocalDate> dates) {
        List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqOrderBySleepDateAsc(memberSeq);
        SleepAndWakeUpTimeResponseDto sleepAndWakeUpTimeResponseDto;

        LocalTime avgTime;

        List<Duration> durations = new ArrayList<>();

        Duration totalSleepTime = null;

        for (int i = 0; i < dates.size(); i++) {
            if (dates.get(i).equals(videoRecords.get(i).getSleepDate())) {
                sleepAndWakeUpTimeResponseDto = saveTimeService.getSleepAndWakeupTime(memberSeq, dates.get(i));
                totalSleepTime = Duration.between(sleepAndWakeUpTimeResponseDto.getSleepTime(), sleepAndWakeUpTimeResponseDto.getWakeUpTime());
                durations.add(totalSleepTime);
            }
        }

        for(Duration duration : durations) {
            totalSleepTime = totalSleepTime.plus(duration);
        }

        System.out.println(totalSleepTime);

        long hours = Objects.requireNonNull(totalSleepTime).toHours();
        long minutes = totalSleepTime.toMinutes() % 60;
        long seconds = totalSleepTime.toSeconds() % 60;

        hours /= dates.size();
        minutes /= dates.size();
        seconds /= dates.size();

        System.out.println(durations.size());
        System.out.println("hours = " + hours);
        System.out.println("minutes = " + minutes);
        System.out.println("seconds = " + seconds);


        avgTime = LocalTime.of((int) hours, (int) minutes, (int) seconds);

        System.out.println(avgTime);

        return avgTime;
    }
}
