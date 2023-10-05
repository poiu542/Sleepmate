package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.dto.NormalResponseDto;
import site.sleepmate.backend.repository.HeartRateRecordRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NormalHeartRateMeasurementService {
    private final HeartRateRecordRepository heartRateRecordRepository;
    private final BMIMeasurementService bmiMeasurementService;

    public NormalResponseDto getMinAndMaxBPM(Long memberSeq, LocalDate sleepDate) {
        NormalResponseDto normalResponseDto = new NormalResponseDto();
        // 심박수 시간순으로 정렬해서 리스트에 담기
        List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTime(memberSeq, sleepDate);

        double minBPM = heartRateRecords.get(0).getHeartRate();
        double maxBPM = heartRateRecords.get(0).getHeartRate();
        double bpm = 0;

        for (int i = 0; i < heartRateRecords.size(); i++) {
            if (heartRateRecords.get(i).getHeartRate() == 0) continue;

            if (heartRateRecords.get(i).getHeartRate() < minBPM) minBPM = heartRateRecords.get(i).getHeartRate();
            else if (heartRateRecords.get(i).getHeartRate() > maxBPM) maxBPM = heartRateRecords.get(i).getHeartRate();
        }

        double bmi = bmiMeasurementService.getBMI(memberSeq);

        return normalResponseDto.getNormalResponseDto((int) minBPM, (int) maxBPM, 0, bmi);
    }
}
