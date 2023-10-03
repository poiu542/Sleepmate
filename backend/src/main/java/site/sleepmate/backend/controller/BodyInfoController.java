package site.sleepmate.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.dto.BodyInfoResponseDto;
import site.sleepmate.backend.dto.MemberRequestDto;
import site.sleepmate.backend.service.UserBodyInfoService;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/member")
public class BodyInfoController {
    private final UserBodyInfoService userBodyInfoService;
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
}
