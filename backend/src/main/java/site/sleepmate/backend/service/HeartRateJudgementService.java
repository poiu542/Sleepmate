package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.repository.HeartRateRecordRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HeartRateJudgementService {
    private final HeartRateRecordRepository heartRateRecordRepository;

    public Boolean getJudgement(Member member, LocalDate sleepDate) {
        List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMemberAndSleepDateOrderByTime(member, sleepDate);
        // 정상 심박수 true, 비정상 false
        boolean judgement = true;

        for (HeartRateRecord heartRateRecord : heartRateRecords) {
            if (heartRateRecord.getHeartRate() > 85 || heartRateRecord.getHeartRate() < 40) {
                judgement = false;
                break;
            }
        }
        return judgement;
    }
}
