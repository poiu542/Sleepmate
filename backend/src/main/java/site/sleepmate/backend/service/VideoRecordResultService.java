package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.dto.SleepAndWakeUpTimeResponseDto;
import site.sleepmate.backend.dto.TotalSleepDataResponseDto;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

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
}
