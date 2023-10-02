package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PosturePercentageDto implements Comparable<PosturePercentageDto>{
    private Integer posture;
    private Double percentage;

    public PosturePercentageDto buildDto(Integer posture, Double percentage){
        return PosturePercentageDto.builder()
                .posture(posture)
                .percentage(percentage)
                .build();
    }

    @Override
    public int compareTo(PosturePercentageDto o) {
        return Double.compare(this.percentage, o.percentage);
    }
}
