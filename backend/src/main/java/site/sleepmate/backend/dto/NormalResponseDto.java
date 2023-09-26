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

    public NormalResponseDto getNormalResponseDto(Integer minHeartRate, Integer maxHeartRate) {
        return NormalResponseDto.builder()
                .minHeartRate(minHeartRate)
                .maxHeartRate(maxHeartRate)
                .build();
    }
}
