package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AbnormalResponseDto {
    private String detectedTime;
    private Integer abnormalHeartRate;
    private Integer posture;
    private Integer measurement;

    public static AbnormalResponseDto getAbnormalData(String detectedTime, Integer abnormalHeartRate, Integer posture, Integer measurement) {
        return AbnormalResponseDto.builder()
                .detectedTime(detectedTime)
                .abnormalHeartRate(abnormalHeartRate)
                .posture(posture)
                .measurement(measurement)
                .build();
    }
}
