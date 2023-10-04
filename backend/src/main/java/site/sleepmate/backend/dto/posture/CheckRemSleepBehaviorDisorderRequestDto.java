package site.sleepmate.backend.dto.posture;

import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
public class CheckRemSleepBehaviorDisorderRequestDto {
    private Long memberSeq;
    private LocalDate sleepDate;
}
