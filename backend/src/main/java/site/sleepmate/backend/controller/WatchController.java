package site.sleepmate.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.dto.AccelerometerRequestDto;
import site.sleepmate.backend.dto.LuxRequestDto;
import site.sleepmate.backend.dto.MemberRequestDto;
import site.sleepmate.backend.dto.WakeUpResponseDto;
import site.sleepmate.backend.dto.watch.ConnectionRequestDto;
import site.sleepmate.backend.dto.watch.ConnectionResponseDto;
import site.sleepmate.backend.service.WatchService;

import java.time.LocalDate;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/watch")
@RestController
public class WatchController {
    private final WatchService watchService;

    @PostMapping("/luxAndTime")
    public ResponseEntity<WakeUpResponseDto> getLuxAndSleepTime(@RequestBody MemberRequestDto memberRequestDto){
        long memberSeq = memberRequestDto.getMemberSeq();
        LocalDate sleepDate = memberRequestDto.getSleepDate();
        WakeUpResponseDto wakeUpResponseDto = watchService.getLuxAndSleepTime(memberSeq, sleepDate);
        return new ResponseEntity<>(wakeUpResponseDto, HttpStatus.OK);
    }

    @PostMapping("/rhythm")
    public ResponseEntity<Map<String, Integer>> getCircadianRhythm(@RequestBody MemberRequestDto memberRequestDto){
        long memberSeq = memberRequestDto.getMemberSeq();
        LocalDate sleepDate = memberRequestDto.getSleepDate();
        Map<String, Integer> rhythmResult = watchService.getCircadianRhythm(memberSeq, sleepDate);
        return new ResponseEntity<>(rhythmResult, HttpStatus.OK);
    }

    @PostMapping("/illuminance")
    public ResponseEntity<?> saveLuxData(@RequestBody LuxRequestDto luxRequestDto){
        try{
            watchService.saveLuxData(luxRequestDto);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/acceleration")
    public ResponseEntity<?> saveAccelerometerData(@RequestBody AccelerometerRequestDto accelerometerRequestDto){
        try{
            watchService.saveAccelerometerData(accelerometerRequestDto);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/connection")
    public ResponseEntity<Void> connection(@RequestBody final ConnectionRequestDto requestDto) {
        final Long memberSeq = requestDto.getMemberSeq();

        watchService.connection(memberSeq);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/disconnection")
    public ResponseEntity<Void> disconnection(@RequestBody final ConnectionRequestDto requestDto) {
        final Long memberSeq = requestDto.getMemberSeq();

        watchService.disconnection(memberSeq);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/connection/{memberSeq}")
    public ResponseEntity<ConnectionResponseDto> isConnected(@PathVariable final Long memberSeq) {
        final ConnectionResponseDto responseDto = watchService.isConnected(memberSeq);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/sending/{memberSeq}")
    public ResponseEntity<ConnectionResponseDto> isSendingData(@PathVariable final Long memberSeq) {
        final ConnectionResponseDto responseDto = watchService.isSendingData(memberSeq);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
