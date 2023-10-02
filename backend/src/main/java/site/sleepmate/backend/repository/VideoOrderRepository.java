package site.sleepmate.backend.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import site.sleepmate.backend.domain.VideoOrder;
import site.sleepmate.backend.dto.PostureResponseDto;

import java.time.LocalDate;
import java.util.List;
public interface VideoOrderRepository extends JpaRepository<VideoOrder, Long> {

    List<VideoOrder> findAllByMember_MemberSeqAndSleepDateOrderByStartTime(Long memberSeq, LocalDate sleepDate);

    @Query("select new site.sleepmate.backend.dto.PostureResponseDto(v.posture, v.startTime, v.capture) " +
            "from VideoOrder v join v.member m where m.memberSeq=:memberSeq and v.sleepDate=:sleepDate")
    List<PostureResponseDto> findBySleepDateAndMember_MemberSeq(LocalDate sleepDate, Long memberSeq,
                                                                Sort sort);
}
