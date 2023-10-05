package site.sleepmate.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.sleepmate.backend.service.DataService;

import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/data")
@RestController
public class DataController {
    private final DataService dataService;

    @PostMapping("/heartbeat")
    public ResponseEntity<Object> saveHeartbeat(@RequestBody Map<String, Double> heartbeat){
        try{
            dataService.saveHeartRateRecord(heartbeat.get("heartbeat"));
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
