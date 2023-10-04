package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.dto.AlarmRequestDto;
import site.sleepmate.backend.dto.HeartRateRequestDto;
import site.sleepmate.backend.dto.SleepAndWakeUpTimeResponseDto;
import site.sleepmate.backend.service.SaveTimeService;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class SaveTimeController {
    private final SaveTimeService saveTimeService;

    @PostMapping("/time")
    public ResponseEntity<?> getTime(@RequestBody HeartRateRequestDto heartRateRequestDto) {
        SleepAndWakeUpTimeResponseDto sleepAndWakeUpTimeResponseDto;
        sleepAndWakeUpTimeResponseDto = saveTimeService.getSleepAndWakeupTime(heartRateRequestDto.getMemberSeq(), heartRateRequestDto.getSleepDate());
        return new ResponseEntity<>(sleepAndWakeUpTimeResponseDto, HttpStatus.OK);
    }

}
