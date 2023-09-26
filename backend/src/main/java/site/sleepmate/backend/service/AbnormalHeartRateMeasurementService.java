package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.HeartRateRecord;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.domain.VideoOrder;
import site.sleepmate.backend.dto.AbnormalPartDto;
import site.sleepmate.backend.dto.AbnormalResponseDto;
import site.sleepmate.backend.repository.HeartRateRecordRepository;
import site.sleepmate.backend.repository.VideoOrderRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AbnormalHeartRateMeasurementService {
    private final HeartRateRecordRepository heartRateRecordRepository;
    private final VideoOrderRepository videoOrderRepository;

    // 감지된 시간 & 이상 심박수 & 해당 자세 반환 메서드
    public List<AbnormalResponseDto> getAbnormalSituation(Member member, LocalDate sleepDate) {
        // 수면 날짜의 데이터 가져오기(수정해야함)
        List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMemberAndSleepDateOrderByTime(member, sleepDate);
        List<VideoOrder> videoOrders = videoOrderRepository.findAllBySleepDateOrderByStartTime(sleepDate);

        List<AbnormalResponseDto> abnormalResponseDtos = new ArrayList<>();
        List<AbnormalPartDto> abnormalPartDtos = new ArrayList<>();

        AbnormalResponseDto abnormalResponseDto = new AbnormalResponseDto();
        AbnormalPartDto abnormalPartDto = new AbnormalPartDto();

        List<LocalDateTime> detectedTimes = new ArrayList<>();

        // 이상 시간을 담은 Set
        String detectedTime = "";
        int dectedHeartrate = 0;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        // 이상 심박수일때, detectedTimeAndHeartRate에 시간, 이상 심박수 담기
        for (HeartRateRecord heartRateRecord : heartRateRecords) {
            if (heartRateRecord.getHeartRate() > 85 || heartRateRecord.getHeartRate() < 40) {
                // 감지 시간 LocalDateTime으로 리스트에 저장
                detectedTimes.add(heartRateRecord.getTime());
                // 감지된 시간 String으로 변경해서 저장
                detectedTime = formatter.format(heartRateRecord.getTime());
                // 감지된 시간 Double -> Int로 변경해서 저장
                dectedHeartrate = heartRateRecord.getHeartRate().intValue();
                // 감지된 시간, 그때 저장된 심박수 저장
                abnormalPartDtos.add(AbnormalPartDto.getAbnormalPartData(detectedTime, dectedHeartrate));
            }
        }

        for (VideoOrder videoOrder : videoOrders) {
            for (int i = detectedTimes.size(); i > 0; i--){
                if (videoOrder.getStartTime().isBefore(detectedTimes.get(i)) && videoOrder.getEndTime().isAfter(detectedTimes.get(i))) {
                    abnormalResponseDtos.add(AbnormalResponseDto.getAbnormalData(abnormalPartDto.getDetectedTime(), abnormalPartDto.getAbnormalHeartRate(), videoOrder.getPosture()));
                }
            }
        }

        return abnormalResponseDtos;
    }
}
