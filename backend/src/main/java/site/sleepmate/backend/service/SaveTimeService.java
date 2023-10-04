package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.dto.AlarmRequestDto;
import site.sleepmate.backend.dto.SleepAndWakeUpTimeResponseDto;
import site.sleepmate.backend.repository.MemberRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SaveTimeService {
    private final VideoRecordRepository videoRecordRepository;
    private final MemberRepository memberRepository;
    public SleepAndWakeUpTimeResponseDto getSleepAndWakeupTime(Long memberSeq, LocalDate sleepDate) {
        List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTimeDesc(memberSeq, sleepDate);

        LocalTime sleepTime = LocalTime.from(videoRecords.get(videoRecords.size()-1).getTime());
        LocalTime wakeUpTime = LocalTime.from(videoRecords.get(0).getTime());

        return SleepAndWakeUpTimeResponseDto.builder()
                .sleepTime(sleepTime)
                .wakeUpTime(wakeUpTime)
                .build();
    }

    public void saveAlarmTime(Long memberSeq, LocalTime alarmTime) {
        Member member = memberRepository.findById(memberSeq).orElseThrow(NoSuchElementException::new);
        memberRepository.updateMemberAlarmInfo(memberSeq, alarmTime);
    }
}
