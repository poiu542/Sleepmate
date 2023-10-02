package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.repository.HeartRateRecordRepository;
import site.sleepmate.backend.repository.MemberRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class DataService {
    private final HeartRateRecordRepository heartRateRecordRepository;
    private final MemberRepository memberRepository;
    public void saveHeartRateRecord(double heartRate){
        Member member = memberRepository.findByMemberSeq(1l).orElseThrow(() -> new NoSuchElementException());
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDate sleepDate = currentTime.toLocalDate();
        if(currentTime.isBefore(LocalDateTime.of(sleepDate, LocalTime.of(12, 0, 0)))){
            //현재 시간이 해당일의 정오 이전이면, 자정 이후의 잠. sleepDate 하루 빼줌
            sleepDate = sleepDate.minusDays(1);
        } //현재 시간이 해당일의 정오 이후이면, 자정 이전의 잠. sleepDate 그대로
        HeartRateRecord heartRateRecord = HeartRateRecord.builder()
                .heartRate(heartRate)
                .time(currentTime)
                .member(member)
                .sleepDate(sleepDate)
                .build();
        heartRateRecordRepository.save(heartRateRecord);
    }
}
