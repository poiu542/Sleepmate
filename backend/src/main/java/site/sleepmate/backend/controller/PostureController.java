package site.sleepmate.backend.controller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.sleepmate.backend.dto.MemberRequestDto;
import site.sleepmate.backend.dto.PosturePercentageDto;
import site.sleepmate.backend.dto.PostureResponseDto;
import site.sleepmate.backend.dto.posture.CheckRemSleepBehaviorDisorderRequestDto;
import site.sleepmate.backend.dto.posture.CheckRemSleepBehaviorDisorderResponseDto;
import site.sleepmate.backend.dto.posture.SavePosturePictureRequestDto;
import site.sleepmate.backend.service.PostureService;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @PatchMapping("/picture")
    public ResponseEntity<Void> savePosturePicture(@ModelAttribute final SavePosturePictureRequestDto requestDto){
        final Long memberSeq = requestDto.getMemberSeq();
        final LocalDateTime sleepdatetime = requestDto.getSleepdatetime();
        final MultipartFile picture = requestDto.getPicture();

        postureService.savePosturePicture(memberSeq, sleepdatetime, picture);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/remSleepBehaviorDisorder")
    public ResponseEntity<CheckRemSleepBehaviorDisorderResponseDto> checkRemSleepBehaviorDisorder(@RequestBody final CheckRemSleepBehaviorDisorderRequestDto requestDto) {
        final Long memberSeq = requestDto.getMemberSeq();
        final LocalDate sleepDate = requestDto.getSleepDate();

        final CheckRemSleepBehaviorDisorderResponseDto responseDto = postureService.checkRemSleepBehaviorDisorder(memberSeq, sleepDate);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
