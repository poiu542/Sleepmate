package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.dto.NormalResponseDto;
import site.sleepmate.backend.repository.HeartRateRecordRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NormalHeartRateMeasurementService {
    private final HeartRateRecordRepository heartRateRecordRepository;

    public NormalResponseDto getMinAndMaxBPM(Long memberSeq, LocalDate sleepDate) {
        // 심박수 시간순으로 정렬해서 리스트에 담기
        List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTime(memberSeq, sleepDate);
        // 분당 BPM 최소값, 최대값을 NormalDto 에 담기
        NormalResponseDto normalResponseDto = new NormalResponseDto();
        int minBPM = 0;
        int maxBPM = 0;
        int bpm = 0;

        // 1분간격으로 BPM 을 계산하기 위해 크기 6으로 지정
        List<Double> calBPM = new ArrayList<Double>(6);

        // 6번째가 될때마다 bpm값 구해서 최소값 or 최대값 구하는 로직
        for (int i = 0; i < heartRateRecords.size(); i++) {
            if (i % 6 == 0) {
                int sumBPM = 0;
                for (int j = 0; j < calBPM.size(); j++) sumBPM += calBPM.get(i);

                bpm = sumBPM / 6;
                if (bpm < minBPM) minBPM = bpm;
                else if (bpm > maxBPM) maxBPM = bpm;

                calBPM.clear();
                calBPM.add(heartRateRecords.get(i).getHeartRate());
            } else {
                calBPM.add(heartRateRecords.get(i).getHeartRate());
            }
        }
        return normalResponseDto.getNormalResponseDto(minBPM, maxBPM, 0);
    }
}
