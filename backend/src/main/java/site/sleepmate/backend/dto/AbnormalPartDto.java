package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AbnormalPartDto {
    private String detectedTime;
    private Integer abnormalHeartRate;

    public static AbnormalPartDto getAbnormalPartData(String detectedTime, Integer abnormalHeartRate) {
        return AbnormalPartDto.builder()
                .detectedTime(detectedTime)
                .abnormalHeartRate(abnormalHeartRate)
                .build();
    }
}
