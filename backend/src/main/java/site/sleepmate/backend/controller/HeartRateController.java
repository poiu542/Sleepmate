package site.sleepmate.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.dto.AbnormalResponseDto;
import site.sleepmate.backend.dto.HeartRateRequestDto;
import site.sleepmate.backend.dto.NormalResponseDto;
import site.sleepmate.backend.service.AbnormalHeartRateMeasurementService;
import site.sleepmate.backend.service.HeartRateJudgementService;
import site.sleepmate.backend.service.NormalHeartRateMeasurementService;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/health")
public class HeartRateController {
    private final AbnormalHeartRateMeasurementService abnormalHeartRateMeasurementService;
    private final NormalHeartRateMeasurementService normalHeartRateMeasurementService;
    private final HeartRateJudgementService heartRateJudgementService;

    @PostMapping("/heart-rate")
    public  ResponseEntity<?> getHeartRate(@RequestBody HeartRateRequestDto heartRateRequestDto) {
        Integer measurement = heartRateJudgementService.getJudgement(heartRateRequestDto.getMemberSeq(), heartRateRequestDto.getSleepDate());
        if (measurement == 0) {
            NormalResponseDto normalResponseDto = normalHeartRateMeasurementService.getMinAndMaxBPM(heartRateRequestDto.getMemberSeq(), heartRateRequestDto.getSleepDate());
            return new ResponseEntity<>(normalResponseDto, HttpStatus.OK);
        } else {
            List<AbnormalResponseDto> abnormalResponseDtos = abnormalHeartRateMeasurementService.getAbnormalSituation(heartRateRequestDto.getMemberSeq(), heartRateRequestDto.getSleepDate());
            return new ResponseEntity<>(abnormalResponseDtos, HttpStatus.OK);
        }
    }
}
