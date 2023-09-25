package site.sleepmate.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.dto.WakeUpResponseDto;
import site.sleepmate.backend.service.WatchService;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RequestMapping("/api/watch")
@RestController
public class WatchController {
    private final WatchService watchService;

    @GetMapping("/luxAndTime")
    public ResponseEntity<WakeUpResponseDto> getLuxAndSleepTime(){
        LocalDateTime nowTime = watchService.getLastRecord().getTime();
        WakeUpResponseDto wakeUpResponseDto = watchService.getLuxAndSleepTime(nowTime);
        return new ResponseEntity<>(wakeUpResponseDto, HttpStatus.OK);
    }
}
