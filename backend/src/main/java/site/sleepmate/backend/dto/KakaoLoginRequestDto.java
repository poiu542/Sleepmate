package site.sleepmate.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoLoginRequestDto {
    private String email;
    private String nickname;
    private String ageRange;
    private String gender;
    private Integer height;
    private Integer weight;

    public KakaoLoginRequestDto getKakaoLoginData(String email, String nickname, String ageRange, String gender, Integer height, Integer weight) {
        return KakaoLoginRequestDto.builder()
                .email(email)
                .nickname(nickname)
                .ageRange(ageRange)
                .gender(gender)
                .height(height)
                .weight(weight)
                .build();
    }
}
