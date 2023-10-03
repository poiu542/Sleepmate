package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class TimeFormattingService {
    public String localTimeFormat(LocalTime localTime) {
        // DateTimeFormatter를 사용하여 "HH:MM" 형식으로 포맷
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        return localTime.format(formatter);
    }

    public String durationFormat(Duration sleepTime) {
        String durationStr = String.valueOf(sleepTime);

        Duration duration = Duration.parse(durationStr);

        LocalTime localTime = LocalTime.MIDNIGHT.plus(duration);

        return localTime.toString().substring(0,5);
    }
}
