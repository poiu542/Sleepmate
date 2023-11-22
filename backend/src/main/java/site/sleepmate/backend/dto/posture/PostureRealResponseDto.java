package site.sleepmate.backend.dto.posture;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@AllArgsConstructor
public class PostureRealResponseDto {
    private Integer posture;
    private String time;
    private String capture;
}
