package site.sleepmate.backend.dto.posture;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@AllArgsConstructor
public class CheckRemSleepBehaviorDisorderResponseDto {
    private String disorderState;
}
