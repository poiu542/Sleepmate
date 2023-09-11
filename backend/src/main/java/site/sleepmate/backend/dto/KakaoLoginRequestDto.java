package site.sleepmate.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoLoginRequestDto {
    private String email;
    private String nickname;
    private String birthday;
    private String gender;
}
