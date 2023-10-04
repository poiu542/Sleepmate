package site.sleepmate.backend.dto;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
public class RecordToOrderResponseDto {
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer posture;
    private String capture;
    private LocalDate sleepDate;

    public RecordToOrderResponseDto(LocalTime startTime, LocalTime endTime, Integer posture, String capture, LocalDate sleepDate) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.posture = posture;
        this.capture = capture;
        this.sleepDate = sleepDate;
    }
}
