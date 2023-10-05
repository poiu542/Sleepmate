package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.dto.NormalResponseDto;
import site.sleepmate.backend.repository.HeartRateRecordRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NormalHeartRateMeasurementService {
    private final HeartRateRecordRepository heartRateRecordRepository;
    private final BMIMeasurementService bmiMeasurementService;

    public NormalResponseDto getMinAndMaxBPM(final Long memberSeq, final LocalDate sleepDate) {
        final NormalResponseDto normalResponseDto = new NormalResponseDto();

        // 심박수 시간순으로 정렬해서 리스트에 담기
        final List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTime(memberSeq, sleepDate);

        double minBPM = heartRateRecords.get(0).getHeartRate();
        double maxBPM = heartRateRecords.get(0).getHeartRate();

        for (final HeartRateRecord heartRateRecord : heartRateRecords) {
            if (heartRateRecord.getHeartRate() == 0) continue;

            if (heartRateRecord.getHeartRate() < minBPM) {
                minBPM = heartRateRecord.getHeartRate();
            } else if (heartRateRecord.getHeartRate() > maxBPM) {
                maxBPM = heartRateRecord.getHeartRate();
            }
        }

        final double bmi = bmiMeasurementService.getBMI(memberSeq);

        return normalResponseDto.getNormalResponseDto((int) minBPM, (int) maxBPM, 0, bmi);
    }
}
