package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.repository.HeartRateRecordRepository;
import site.sleepmate.backend.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class DataService {
    private final HeartRateRecordRepository heartRateRecordRepository;
    private final MemberRepository memberRepository;
    public void saveHeartRateRecord(double heartRate){
        Member member = memberRepository.findByMemberSeq(1l).orElseThrow(() -> new NoSuchElementException());
        HeartRateRecord heartRateRecord = HeartRateRecord.builder()
                .heartRate(heartRate)
                .time(LocalDateTime.now())
                .member(member)
                .build();
        heartRateRecordRepository.save(heartRateRecord);
    }
}
