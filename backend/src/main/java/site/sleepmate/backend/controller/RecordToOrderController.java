package site.sleepmate.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.service.RecordToOrderService;


@RestController
@AllArgsConstructor
@RequestMapping("/record")
public class RecordToOrderController {
    private final RecordToOrderService recordToOrderService;

    @ResponseBody
    @GetMapping("/order")
    public void orderRecords() {
        recordToOrderService.getVideoOrder();
    }
}
