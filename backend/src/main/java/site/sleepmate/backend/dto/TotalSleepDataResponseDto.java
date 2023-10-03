package site.sleepmate.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
public class TotalSleepDataResponseDto {
    private LocalTime sleepTime;
    private LocalTime wakeUpTime;
    private String totalSleepTime;

    public TotalSleepDataResponseDto(LocalTime sleepTime, LocalTime wakeUpTime, String totalSleepTime) {
        this.sleepTime = sleepTime;
        this.wakeUpTime = wakeUpTime;
        this.totalSleepTime = totalSleepTime;
    }
}
