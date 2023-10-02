package site.sleepmate.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.dto.MemberRequestDto;
import site.sleepmate.backend.dto.PosturePercentageDto;
import site.sleepmate.backend.dto.PostureResponseDto;
import site.sleepmate.backend.service.PostureService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/posture")
@RestController
public class PostureController {
    private final PostureService postureService;

    @PostMapping("/change")
    public ResponseEntity<List<PostureResponseDto>> getChangeHistory(@RequestBody MemberRequestDto memberRequestDto){
        long memberSeq = memberRequestDto.getMemberSeq();
        LocalDate sleepDate = memberRequestDto.getSleepDate();
        List<PostureResponseDto> changeHistory = postureService.getChangeHistory(memberSeq, sleepDate);

        return new ResponseEntity<>(changeHistory, HttpStatus.OK);
    }

    @PostMapping("/posture/most")
    public ResponseEntity<PosturePercentageDto> getMostFrequentPosture(@RequestBody MemberRequestDto memberRequestDto){
        long memberSeq = memberRequestDto.getMemberSeq();
        LocalDate sleepDate = memberRequestDto.getSleepDate();
        PosturePercentageDto posture = postureService.getMostFrequentPosture(memberSeq, sleepDate);

        return new ResponseEntity<>(posture, HttpStatus.OK);
    }

    @PostMapping("/posture")
    public ResponseEntity<List<PosturePercentageDto>> getPostures(@RequestBody MemberRequestDto memberRequestDto){
        long memberSeq = memberRequestDto.getMemberSeq();
        LocalDate sleepDate = memberRequestDto.getSleepDate();
        List<PosturePercentageDto> postures = postureService.getPostures(memberSeq, sleepDate);

        return new ResponseEntity<>(postures, HttpStatus.OK);
    }

    @PostMapping("/change-count")
    public ResponseEntity<Object> getChangeCount(@RequestBody MemberRequestDto memberRequestDto){
        long memberSeq = memberRequestDto.getMemberSeq();
        LocalDate sleepDate = memberRequestDto.getSleepDate();
        Map<String, Integer> changeCount = postureService.getChangeCount(memberSeq, sleepDate);

        return new ResponseEntity<>(changeCount, HttpStatus.OK);
    }
}
