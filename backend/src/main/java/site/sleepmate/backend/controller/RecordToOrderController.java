package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.dto.MemberRequestDto;
import site.sleepmate.backend.dto.RecordToOrderRequestDto;
import site.sleepmate.backend.dto.RecordToOrderResponseDto;
import site.sleepmate.backend.service.RecordToOrderService;
import java.time.LocalDate;


@RestController
@AllArgsConstructor
@RequestMapping("/api/video")
public class RecordToOrderController {
    private final RecordToOrderService recordToOrderService;

    @PostMapping("/to-order")
    public ResponseEntity<String> orderRecords(@RequestBody MemberRequestDto memberRequestDto) {
        recordToOrderService.getVideoOrder(memberRequestDto.getMemberSeq(), memberRequestDto.getSleepDate());
        return ResponseEntity.status(HttpStatus.OK).body("OK");
    }
}
