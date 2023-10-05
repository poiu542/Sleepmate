package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BodyInfoResponseDto {
    private long memberSeq;
    private int weight;
    private int height;

    public BodyInfoResponseDto(Long memberSeq, Integer weight, Integer height) {
        this.memberSeq = memberSeq;
        this.weight = weight;
        this.height = height;
    }
}
