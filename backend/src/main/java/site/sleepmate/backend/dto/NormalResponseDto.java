package site.sleepmate.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NormalResponseDto {
    private Integer minHeartRate;
    private Integer maxHeartRate;
    private Integer measurement;
    private Double bmi;

    public NormalResponseDto getNormalResponseDto(Integer minHeartRate, Integer maxHeartRate, Integer measurement, Double bmi) {
        return NormalResponseDto.builder()
                .minHeartRate(minHeartRate)
                .maxHeartRate(maxHeartRate)
                .measurement(measurement)
                .bmi(bmi)
                .build();
    }
}
