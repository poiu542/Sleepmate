package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TimeFormattingService {
    public String localTimeFormat(final LocalTime localTime) {
        // DateTimeFormatter를 사용하여 "HH:MM" 형식으로 포맷
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        return localTime.format(formatter);
    }

    public String durationFormat(final Duration sleepTime) {
        final String durationStr = String.valueOf(sleepTime);

        final Duration duration = Duration.parse(durationStr);

        final LocalTime localTime = LocalTime.MIDNIGHT.plus(duration);

        return localTime.toString().substring(0,5);
    }
}
