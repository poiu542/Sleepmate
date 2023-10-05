package site.sleepmate.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
public class SleepAndWakeUpTimeResponseDto {
    private LocalTime sleepTime;
    private LocalTime wakeUpTime;

    public SleepAndWakeUpTimeResponseDto(LocalTime sleepTime, LocalTime wakeUpTime) {
        this.sleepTime = sleepTime;
        this.wakeUpTime = wakeUpTime;
    }
}
