package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.service.RecordToOrderService;
import java.time.LocalDate;


@RestController
@AllArgsConstructor
@RequestMapping("/record")
public class RecordToOrderController {
    private final RecordToOrderService recordToOrderService;

    @ResponseBody
    @GetMapping("/order/{sleepDate}")
    public void orderRecords(@PathVariable LocalDate sleepDate) {
        recordToOrderService.getVideoOrder(sleepDate);
    }
}
