package site.sleepmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.domain.VideoRecord;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoRecordRequestDto {
    private Long memberSeq;
    private String capture;
    private Integer posture;

    public VideoRecord toEntity(VideoRecordRequestDto videoRecordRequestDto, Member member){
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDate sleepDate = currentTime.toLocalDate();
        if(currentTime.isBefore(LocalDateTime.of(sleepDate, LocalTime.of(12, 0, 0)))){
            //자정 이전이면 해당일 전날의 잠. 하루 빼기
            sleepDate = sleepDate.minusDays(1);
        }
        return VideoRecord.builder()
                .posture(posture)
                .capture(capture)
                .member(member)
                .sleepDate(sleepDate)
                .time(currentTime)
                .build();
    }
}
