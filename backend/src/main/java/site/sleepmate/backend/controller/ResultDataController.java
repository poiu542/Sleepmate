package site.sleepmate.backend.controller;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.dto.MemberRequestDto;
import site.sleepmate.backend.dto.TotalSleepDataResponseDto;
import site.sleepmate.backend.service.VideoRecordResultService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/video")
public class ResultDataController {
    private final VideoRecordResultService videoRecordResultService;

    @PostMapping
    public ResponseEntity<Integer> getAllVideoLogCount(@RequestBody MemberRequestDto memberRequestDto) {
        int result = videoRecordResultService.getAllVideoCount(memberRequestDto.getMemberSeq(), memberRequestDto.getSleepDate());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/comprehensive-data")
    public ResponseEntity<TotalSleepDataResponseDto> getSleepData(@RequestBody MemberRequestDto memberRequestDto) {
        TotalSleepDataResponseDto totalSleepDataResponseDto = videoRecordResultService.getTotalSleepData(memberRequestDto.getMemberSeq(), memberRequestDto.getSleepDate());
        return new ResponseEntity<>(totalSleepDataResponseDto, HttpStatus.OK);
    }
}
