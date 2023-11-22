package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.sleepmate.backend.domain.LuxRecord;
import site.sleepmate.backend.domain.Member;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LuxRequestDto {
    private Long memberSeq;
    private Double lux;

    public LuxRecord toEntity(LuxRequestDto luxRequestDto, Member member){
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDate sleepDate = currentTime.toLocalDate();
        if(currentTime.isBefore(LocalDateTime.of(sleepDate, LocalTime.of(12, 0, 0)))){
            //자정 이전이면 해당일 전날의 잠. 하루 빼기
            sleepDate = sleepDate.minusDays(1);
        }
        return LuxRecord.builder()
                .lux(luxRequestDto.getLux())
                .member(member)
                .sleepDate(sleepDate)
                .time(currentTime)
                .build();
    }
}
