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

    public static AbnormalResponseDto getAbnormalData(String detectedTime, Integer abnormalHeartRate, Integer posture) {
        return AbnormalResponseDto.builder()
                .detectedTime(detectedTime)
                .abnormalHeartRate(abnormalHeartRate)
                .posture(posture)
                .build();
    }
}
