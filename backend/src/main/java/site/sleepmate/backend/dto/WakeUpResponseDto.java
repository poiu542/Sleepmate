package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.sleepmate.backend.domain.AccelerometerRecord;
import site.sleepmate.backend.domain.LuxRecord;
import site.sleepmate.backend.domain.VideoOrder;
import site.sleepmate.backend.domain.VideoRecord;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WakeUpResponseDto {
    private Double lux;
    private String startTime;
    private String endTime;

    public static WakeUpResponseDto fromEntities(LuxRecord luxRecord,
                                                 AccelerometerRecord startRecord,
                                                 AccelerometerRecord endRecord){
        return WakeUpResponseDto.builder()
                .lux(luxRecord.getLux())
                .startTime(startRecord.getTime().toString())
                .endTime(endRecord.getTime().toString())
                .build();
    }
}
