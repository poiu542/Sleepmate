package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
public class PostureResponseDto {
    private Integer posture;
    private LocalDateTime time;
    private String capture; //이미지 링크

    //Repository의 query에서 constructor 쓰려면 명시적으로 생성자 선언해주어야 함
    public PostureResponseDto(Integer posture, LocalDateTime time, String capture) {
        this.posture = posture;
        this.time = time;
        this.capture = capture;
    }
}
