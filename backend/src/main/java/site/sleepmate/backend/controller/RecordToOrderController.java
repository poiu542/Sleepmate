package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.service.RecordToOrderService;

import java.time.LocalDate;
import java.time.LocalDateTime;


@RestController
@AllArgsConstructor
@RequestMapping("/api/record")
public class RecordToOrderController {
    private final RecordToOrderService recordToOrderService;

    @ResponseBody
    @GetMapping("/order/{sleepDate}")
    public void orderRecords(@PathVariable LocalDate sleepDate) {
        recordToOrderService.getVideoOrder(sleepDate);
    }
}
