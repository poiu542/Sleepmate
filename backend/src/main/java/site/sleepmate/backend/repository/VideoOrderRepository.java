package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.domain.VideoOrder;

import java.time.LocalDate;
import java.util.List;

public interface VideoOrderRepository extends JpaRepository<VideoOrder, Long> {
    List<VideoOrder> findAllByMember_MemberSeqAndSleepDateOrderByStartTime(Long memberSeq, LocalDate sleepDate);
}
