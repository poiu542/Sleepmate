package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.repository.HeartRateRecordRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NormalHeartRateMeasurementService {
    private final HeartRateRecordRepository heartRateRecordRepository;

    public Double[] getAveBPM() {
        // 심박수 시간순으로 정렬해서 리스트에 담기
        List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByHeartRateOrderByTime();
        // 분당 BPM 최소값, 최대값을 담을 배열
        Double[] aveBPM = new Double[2];
        double minBPM = 0.0;
        double maxBPM = 0.0;
        double bpm = 0.0;

        List<Double> calBPM = new ArrayList<Double>(6);

        for (int i = 0; i < heartRateRecords.size(); i++) {
            if (i % 6 == 0) {
                double sumBPM = 0;
                for (int j = 0; j < calBPM.size(); j++) sumBPM += calBPM.get(i);

                bpm = sumBPM / 6.0;
                if (bpm < minBPM) minBPM = bpm;
                else if (bpm > maxBPM) maxBPM = bpm;

                calBPM.clear();
                calBPM.add(heartRateRecords.get(i).getHeartRate());
            } else {
                calBPM.add(heartRateRecords.get(i).getHeartRate());
            }
        }
        aveBPM[0] = minBPM;
        aveBPM[1] = maxBPM;
        return aveBPM;
    }
}
