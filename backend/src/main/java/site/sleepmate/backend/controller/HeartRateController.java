package site.sleepmate.backend.controller;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.dto.AbnormalResponseDto;
import site.sleepmate.backend.dto.NormalResponseDto;
import site.sleepmate.backend.service.AbnormalHeartRateMeasurementService;
import site.sleepmate.backend.service.HeartRateJudgementService;
import site.sleepmate.backend.service.NormalHeartRateMeasurementService;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/heartRate")
public class HeartRateController {
    private final AbnormalHeartRateMeasurementService abnormalHeartRateMeasurementService;
    private final NormalHeartRateMeasurementService normalHeartRateMeasurementService;
    private final HeartRateJudgementService heartRateJudgementService;

    @GetMapping("/{sleepDate}")
    public  ResponseEntity<?> getHeartRate(@PathVariable LocalDate sleepDate) {
        boolean measurment = heartRateJudgementService.getJudgement(sleepDate);
        if (measurment) {
            NormalResponseDto normalResponseDto = normalHeartRateMeasurementService.getMinAndMaxBPM(sleepDate);
            return new ResponseEntity<>(normalResponseDto, HttpStatus.OK);
        } else {
            List<AbnormalResponseDto> abnormalResponseDtos = abnormalHeartRateMeasurementService.getAbnormalSituation(sleepDate);
            return new ResponseEntity<>(abnormalResponseDtos, HttpStatus.OK);
        }
    }
}
