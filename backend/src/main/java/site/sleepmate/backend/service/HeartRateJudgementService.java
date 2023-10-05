package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.repository.HeartRateRecordRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HeartRateJudgementService {
    private final HeartRateRecordRepository heartRateRecordRepository;

    public Integer getJudgement(final Long memberSeq, final LocalDate sleepDate) {
        final List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTime(memberSeq, sleepDate);

        // 정상 심박수 0, 비정상 1
        int judgement = 0;

        for (final HeartRateRecord heartRateRecord : heartRateRecords) {
            if (heartRateRecord.getHeartRate() > 85 || heartRateRecord.getHeartRate() < 40) {
                judgement = 1;
                break;
            }
        }

        return judgement;
    }
}
