package site.sleepmate.backend.service;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.*;
import site.sleepmate.backend.dto.AbnormalPartDto;
import site.sleepmate.backend.dto.AbnormalResponseDto;
import site.sleepmate.backend.repository.AccelerometerRecordRepository;
import site.sleepmate.backend.repository.HeartRateRecordRepository;
import site.sleepmate.backend.repository.VideoOrderRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AbnormalHeartRateMeasurementService {
    private final HeartRateRecordRepository heartRateRecordRepository;
    private final VideoOrderRepository videoOrderRepository;
    private final VideoRecordRepository videoRecordRepository;
    private final AccelerometerRecordRepository accelerometerRecordRepository;
    private final BMIMeasurementService bmiMeasurementService;

    // 감지된 시간 & 이상 심박수 & 해당 자세 반환 메서드
    public List<AbnormalResponseDto> getAbnormalSituation(Long memberSeq, LocalDate sleepDate) {
        // 특정 회원의 심박수 기록 가져오기
        List<HeartRateRecord> heartRateRecords = heartRateRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTime(memberSeq, sleepDate);
        // 특정 회원의 영상 기록 가져오기
//        List<VideoOrder> videoOrders = videoOrderRepository.findAllByMember_MemberSeqAndSleepDateOrderByStartTime(memberSeq, sleepDate);
        List<AccelerometerRecord> accelerometerRecords = accelerometerRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTimeDesc(memberSeq, sleepDate);
        // 특정 회원의 영상 기록 가져오기
        List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqAndSleepDate(memberSeq, sleepDate);

        // 최종 반환할 List(감지 시간, 감지된 심박수, 해당 자세)
        List<AbnormalResponseDto> abnormalResponseDtos = new ArrayList<>();
        // 로직 중간에 필요한 List(감지 시간, 감지된 심박수)
        List<AbnormalPartDto> abnormalPartDtos = new ArrayList<>();
        // 감지된 시간 List
        List<LocalDateTime> detectedTimes = new ArrayList<>();

        // 이상 시간을 담은 Set
        String detectedTime;
        int dectedHeartrate;

        // DateTime -> String 변경
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");

        // 이상 심박수일때, detectedTimeAndHeartRate에 시간, 이상 심박수 담기
        for (HeartRateRecord heartRateRecord : heartRateRecords) {
            if (heartRateRecord.getHeartRate() == 0) continue;

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

        for (int i = 0; i < detectedTimes.size(); i++) {
            System.out.println(detectedTimes.get(i));
        }

        LocalTime localTime = null;

        double bmi = bmiMeasurementService.getBMI(memberSeq);


        for (int i = 0; i < detectedTimes.size(); i++) {
            for (int j = 0; j < videoRecords.size(); j++) {
                if (videoRecords.get(j).getTime().minusSeconds(15).isBefore(detectedTimes.get(i)) &&
                        videoRecords.get(j).getTime().isAfter(detectedTimes.get(i))) {
//                if (detectedTimes.get(i).isAfter(videoRecords.get(j).getTime()) && detectedTimes.get(i).isAfter(videoRecords.get(j).getTime())) {
                    LocalDateTime target = videoRecords.get(j).getTime();
                    VideoRecord videoRecord = videoRecordRepository.findByTime(target);
                    abnormalResponseDtos.add(AbnormalResponseDto.getAbnormalData(abnormalPartDtos.get(j).getDetectedTime(), abnormalPartDtos.get(j).getAbnormalHeartRate(), videoRecord.getPosture(), 1, bmi));
                }
            }
        }
        return abnormalResponseDtos;
    }
}
