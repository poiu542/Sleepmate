package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.service.AbnormalHeartRateMeasurementService;
import site.sleepmate.backend.service.NormalHeartRateMeasurementService;

import java.time.LocalDate;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/heartRate")
public class HeartRateController {
    private final AbnormalHeartRateMeasurementService abnormalHeartRateMeasurementService;
    private final NormalHeartRateMeasurementService normalHeartRateMeasurementService;

    @GetMapping("/abnormal/{sleepDate}")
    public ResponseEntity<String> abnormalMeasurement(@PathVariable LocalDate sleepDate){
        abnormalHeartRateMeasurementService.getAbnormalSituation(sleepDate);
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @GetMapping("/normal/{sleepDate}")
    public ResponseEntity<String> normalMeasurement(@PathVariable LocalDate sleepDate) {
        normalHeartRateMeasurementService.getMinAndMaxBPM(sleepDate);
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

}
