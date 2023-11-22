package site.sleepmate.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
public class SleepAndWakeUpTimeResponseDto {
    private String sleepTime;
    private String wakeUpTime;

    public SleepAndWakeUpTimeResponseDto(String sleepTime, String wakeUpTime) {
        this.sleepTime = sleepTime;
        this.wakeUpTime = wakeUpTime;
    }
}
