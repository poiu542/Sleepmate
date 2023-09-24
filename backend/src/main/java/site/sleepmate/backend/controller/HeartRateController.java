package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.service.AbnormalHeartRateMeasurementService;
import site.sleepmate.backend.service.NormalHeartRateMeasurementService;

@RestController
@AllArgsConstructor
@RequestMapping("/heartRate")
public class HeartRateController {

    private final AbnormalHeartRateMeasurementService abnormalHeartRateMeasurementService;
    private final NormalHeartRateMeasurementService normalHeartRateMeasurementService;

    @GetMapping("/abnormal")
    public ResponseEntity<String> abnormalMeasurement(){
        abnormalHeartRateMeasurementService.getAbnormalSituation();
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @GetMapping("/normal")
    public ResponseEntity<String> normalMeasurement() {
        normalHeartRateMeasurementService.getMinAndMaxBPM();
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

}
