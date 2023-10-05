package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.repository.HeartRateRecordRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HeartRateJudgementService {
    private final HeartRateRecordRepository heartRateRecordRepository;

    public Integer getJudgement(Long memberSeq, LocalDate sleepDate) {
        List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTime(memberSeq, sleepDate);
        // 정상 심박수 0, 비정상 1
        int judgement = 0;

        for (HeartRateRecord heartRateRecord : heartRateRecords) {
            if (heartRateRecord.getHeartRate() > 85 || heartRateRecord.getHeartRate() < 40) {
                judgement = 1;
                break;
            }
        }
        return judgement;
    }
}
