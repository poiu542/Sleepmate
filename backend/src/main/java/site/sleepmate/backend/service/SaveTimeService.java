package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.AccelerometerRecord;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.dto.AlarmRequestDto;
import site.sleepmate.backend.dto.SleepAndWakeUpTimeResponseDto;
import site.sleepmate.backend.repository.AccelerometerRecordRepository;
import site.sleepmate.backend.repository.MemberRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SaveTimeService {
    private final AccelerometerRecordRepository accelerometerRecordRepository;
    private final MemberRepository memberRepository;

    public SleepAndWakeUpTimeResponseDto getSleepAndWakeupTime(final Long memberSeq, final LocalDate sleepDate) {
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

        return SleepAndWakeUpTimeResponseDto.builder()
                .sleepTime(startSleep.getTime().toLocalTime().toString())
                .wakeUpTime(endSleep.getTime().toLocalTime().toString())
                .build();
    }

    public void saveAlarmTime(Long memberSeq, LocalTime alarmTime) {
        memberRepository.updateMemberAlarmInfo(memberSeq, alarmTime);
    }
}
