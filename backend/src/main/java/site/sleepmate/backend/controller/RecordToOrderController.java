package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.service.RecordToOrderService;

import java.time.LocalDateTime;


@RestController
@AllArgsConstructor
@RequestMapping("/record")
public class RecordToOrderController {
    private final RecordToOrderService recordToOrderService;

    @ResponseBody
    @GetMapping("/order/{member}/{time}")
    public void orderRecords(@PathVariable Integer member, @PathVariable LocalDateTime time) {
        recordToOrderService.getVideoOrder(member, time);
    }
}
