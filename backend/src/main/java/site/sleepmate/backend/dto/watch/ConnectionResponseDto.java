package site.sleepmate.backend.dto.watch;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@AllArgsConstructor
public class ConnectionResponseDto {
    private Boolean connection;
}
