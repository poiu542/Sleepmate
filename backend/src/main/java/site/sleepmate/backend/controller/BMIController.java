package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.service.BMIMeasurmentService;

@RestController
@AllArgsConstructor
@RequestMapping("api/bmi")
public class BMIController {
    private final BMIMeasurmentService bmiMeasurmentService;

    @GetMapping("/{member}")
    public ResponseEntity<Double> getBMIMeasurement(@PathVariable Member member) {
        Double bmiValue = bmiMeasurmentService.getBMI(member);
        return new ResponseEntity<>(bmiValue, HttpStatus.OK);
    }
}
