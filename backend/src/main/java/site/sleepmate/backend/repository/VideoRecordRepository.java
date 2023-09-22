package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.domain.VideoRecord;

import java.time.LocalDateTime;
import java.util.List;

public interface VideoRecordRepository extends JpaRepository<VideoRecord, Integer> {
    List<VideoRecord> findByMemberSeqAndTimeOrderBy(Integer memberSeq, LocalDateTime time);
}
