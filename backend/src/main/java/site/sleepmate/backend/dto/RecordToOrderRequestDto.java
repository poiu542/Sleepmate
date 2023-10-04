package site.sleepmate.backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
public class RecordToOrderRequestDto {
    private LocalTime time;
    private Integer posture;
    private String capture;
    private LocalDate sleepDate;

    public RecordToOrderRequestDto(LocalTime time, Integer posture, String capture, LocalDate sleepDate) {
        this.time = time;
        this.posture = posture;
        this.capture = capture;
        this.sleepDate = sleepDate;
    }

}
