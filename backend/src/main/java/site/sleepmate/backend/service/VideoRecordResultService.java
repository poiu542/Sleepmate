package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.AccelerometerRecord;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.dto.SleepAndWakeUpTimeResponseDto;
import site.sleepmate.backend.dto.StartAndEndDateDto;
import site.sleepmate.backend.dto.TotalSleepDataResponseDto;
import site.sleepmate.backend.repository.AccelerometerRecordRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VideoRecordResultService {
    private final VideoRecordRepository videoRecordRepository;
    private final SaveTimeService saveTimeService;
    private final TimeFormattingService timeFormattingService;
    private final AccelerometerRecordRepository accelerometerRecordRepository;

    public Integer getAllVideoCount(final Long memberSeq, final LocalDate sleepDate) {
        final List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqAndSleepDate(memberSeq, sleepDate);

        return videoRecords.size();
    }

    // 자러간 시간, 일어난 시간, 총 잔 시간
    public TotalSleepDataResponseDto getTotalSleepData(final Long memberSeq, final LocalDate sleepDate) {
        final AccelerometerRecord startSleep =
                accelerometerRecordRepository.findTop1ByMember_MemberSeqAndSleepDateOrderByTimeAsc(memberSeq, sleepDate)
                        .orElseThrow(
                                () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                        );

        final AccelerometerRecord endSleep =
                accelerometerRecordRepository.findTop1ByMember_MemberSeqAndSleepDateOrderByTimeDesc(memberSeq, sleepDate)
                        .orElseThrow(
                                () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                        );

        final LocalTime sleepTime = startSleep.getTime().toLocalTime();
        final LocalTime wakeUpTime = endSleep.getTime().toLocalTime();

        final Duration totalSleepTime = Duration.between(sleepTime, wakeUpTime);

        return TotalSleepDataResponseDto.builder()
                .sleepTime(sleepTime.toString())
                .wakeUpTime(wakeUpTime.toString())
                .totalSleepTime(timeFormattingService.durationFormat(totalSleepTime))
                .build();
    }

    public Double getTimeToDouble(final LocalTime sleepTime) {
        final int hour = sleepTime.getHour();
        final int minute = sleepTime.getMinute();

        // 분을 정수에서 소수로 변환합니다.
        final double minuteAsDecimal = (double) minute / 60.0;

        return hour + minuteAsDecimal;
    }

    // memberSeq 넣으면 기록 시작한 날짜, 끝나는 날짜 출력
    public StartAndEndDateDto getStartAndEndDate(final Long memberSeq){
        final List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqOrderBySleepDateAsc(memberSeq);

        return new StartAndEndDateDto(videoRecords.get(0).getSleepDate(), videoRecords.get(videoRecords.size()-1).getSleepDate());
    }

    // 날짜 담기
    public List<LocalDate> getAllSleepDate(final LocalDate startDate, final LocalDate endDate) {
        final List<LocalDate> datesBetween = new ArrayList<>();

        LocalDate currentDate = startDate;

        while (!currentDate.isAfter(endDate)) {
            datesBetween.add(currentDate);

            currentDate = currentDate.plusDays(1); // 다음 날짜로 이동
        }

        return datesBetween;
    }

    // 평균 잠시간 계산
    public LocalTime getAvgSleepTime(final Long memberSeq, final List<LocalDate> dates) {
        final List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqOrderBySleepDateAsc(memberSeq);

        LocalTime avgTime;

        final List<Duration> durations = new ArrayList<>();

        Duration totalSleepTime = null;

        for (int i = 0; i < dates.size(); i++) {
            if (dates.get(i).equals(videoRecords.get(i).getSleepDate())) {
                final AccelerometerRecord startSleep =
                        accelerometerRecordRepository.findTop1ByMember_MemberSeqAndSleepDateOrderByTimeAsc(memberSeq, dates.get(i))
                                .orElseThrow(
                                        () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                                );

                final AccelerometerRecord endSleep =
                        accelerometerRecordRepository.findTop1ByMember_MemberSeqAndSleepDateOrderByTimeDesc(memberSeq, dates.get(i))
                                .orElseThrow(
                                        () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                                );

                final LocalTime sleepTime = startSleep.getTime().toLocalTime();
                final LocalTime wakeUpTime = endSleep.getTime().toLocalTime();

                totalSleepTime = Duration.between(sleepTime, wakeUpTime);

                durations.add(totalSleepTime);
            }
        }

        for (final Duration duration : durations) {
            totalSleepTime = totalSleepTime.plus(duration);
        }

        long hours = Objects.requireNonNull(totalSleepTime).toHours();
        long minutes = totalSleepTime.toMinutes() % 60;
        long seconds = totalSleepTime.toSeconds() % 60;

        hours /= dates.size();
        minutes /= dates.size();
        seconds /= dates.size();

        avgTime = LocalTime.of((int) hours, (int) minutes, (int) seconds);

        return avgTime;
    }
}
