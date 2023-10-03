package site.sleepmate.backend.service;

import jakarta.persistence.criteria.CriteriaBuilder;
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
    private final BMIMeasurementService bmiMeasurementService;

    // 감지된 시간 & 이상 심박수 & 해당 자세 반환 메서드
    public List<AbnormalResponseDto> getAbnormalSituation(Long memberSeq, LocalDate sleepDate) {
        // 특정 회원의 심박수 기록 가져오기
        List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTime(memberSeq, sleepDate);
        // 특정 회원의 영상 기록 가져오기
        List<VideoOrder> videoOrders = videoOrderRepository.findAllByMember_MemberSeqAndSleepDateOrderByStartTime(memberSeq, sleepDate);

        // 최종 반환할 List(감지 시간, 감지된 심박수, 해당 자세)
        List<AbnormalResponseDto> abnormalResponseDtos = new ArrayList<>();
        // 로직 중간에 필요한 List(감지 시간, 감지된 심박수)
        List<AbnormalPartDto> abnormalPartDtos = new ArrayList<>();

        // 세 가지 정보(감지 시간, 감지된 심박수, 해당 자세)가 담긴 DTO
        AbnormalResponseDto abnormalResponseDto = new AbnormalResponseDto();
        // 두 가지 정보(감지 시간, 감지된 심박수)가 담긴 DTO
        AbnormalPartDto abnormalPartDto = new AbnormalPartDto();
        // 감지된 시간 List
        List<LocalDateTime> detectedTimes = new ArrayList<>();

        // 이상 시간을 담은 Set
        String detectedTime = "";
        int dectedHeartrate = 0;

        // DateTime -> String 변경
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

        double bmi = bmiMeasurementService.getBMI(memberSeq);

        for (VideoOrder videoOrder : videoOrders) {
            for (int i = 0; i < detectedTimes.size(); i++){
                // 감지된 시간이 시작시간보다 나중이고, 종료 시간보다 이전일때 데이터 입력
                if (videoOrder.getStartTime().isBefore(detectedTimes.get(i)) && videoOrder.getEndTime().isAfter(detectedTimes.get(i))) {
                    abnormalResponseDtos.add(AbnormalResponseDto.getAbnormalData(abnormalPartDtos.get(i).getDetectedTime(), abnormalPartDtos.get(i).getAbnormalHeartRate(), videoOrder.getPosture(), 1, bmi));
                }
            }
        }
        return abnormalResponseDtos;
    }
}
