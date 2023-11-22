package site.sleepmate.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.dto.*;
import site.sleepmate.backend.service.SaveTimeService;
import site.sleepmate.backend.service.UserBodyInfoService;
import site.sleepmate.backend.service.VideoRecordResultService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class BodyInfoController {
    private final UserBodyInfoService userBodyInfoService;
    private final SaveTimeService saveTimeService;
    private final VideoRecordResultService videoRecordResultService;
    @PostMapping("user-body-info")
    public ResponseEntity<BodyInfoResponseDto> getBodyInfo(@RequestBody MemberRequestDto memberRequestDto) {
        BodyInfoResponseDto bodyInfoResponseDto = userBodyInfoService.getBodyInfo(memberRequestDto.getMemberSeq());
        return new ResponseEntity<>(bodyInfoResponseDto, HttpStatus.OK);
    }
    @PostMapping("body-info")
    public ResponseEntity<?> saveBodyInfo(@RequestBody BodyInfoResponseDto bodyInfoResponseDto) throws IOException {
        userBodyInfoService.saveBodyInfo(bodyInfoResponseDto.getMemberSeq(), bodyInfoResponseDto.getWeight(), bodyInfoResponseDto.getHeight());
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @PostMapping("/alarm")
    public ResponseEntity<String>  saveAlarmTime(@RequestBody AlarmRequestDto alarmRequestDto) {
        saveTimeService.saveAlarmTime(alarmRequestDto.getMemberSeq(), alarmRequestDto.getAlarmTime());
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }

    @PostMapping("/avg-sleep-time")
    public ResponseEntity<String> getAvgSleepTime(@RequestBody MemberRequestDto memberRequestDto) {
        TotalSleepDataResponseDto totalSleepDataResponseDto = videoRecordResultService.getTotalSleepData(memberRequestDto.getMemberSeq(), memberRequestDto.getSleepDate());

        LocalTime sleepTime = LocalTime.parse(totalSleepDataResponseDto.getTotalSleepTime());

        double result = videoRecordResultService.getTimeToDouble(sleepTime);

        String formattedNumber = String.format("%.2f", result);


//        StartAndEndDateDto startAndEndDateDto = videoRecordResultService.getStartAndEndDate(memberRequestDto.getMemberSeq());
//        List<LocalDate> localDates = videoRecordResultService.getAllSleepDate(startAndEndDateDto.getStartDate(), startAndEndDateDto.getEndDate());
//        LocalTime avgSleepTime = videoRecordResultService.getAvgSleepTime(memberRequestDto.getMemberSeq(), memberRequestDto.getSleepDate(), localDates);
        return new ResponseEntity<>(formattedNumber, HttpStatus.OK);
    }
}
