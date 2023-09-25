package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.sleepmate.backend.domain.LuxRecord;
import site.sleepmate.backend.domain.VideoOrder;
import site.sleepmate.backend.domain.VideoRecord;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WakeUpResponseDto {
    private Integer lux;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public static WakeUpResponseDto fromEntities(LuxRecord luxRecord, VideoRecord startRecord, VideoRecord endRecord){
        return WakeUpResponseDto.builder()
                .lux(luxRecord.getLux())
                .startTime(startRecord.getTime())
                .endTime(endRecord.getTime())
                .build();
    }
}
