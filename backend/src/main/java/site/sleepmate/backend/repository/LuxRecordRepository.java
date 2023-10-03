package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import site.sleepmate.backend.domain.LuxRecord;

import java.time.LocalDateTime;
import java.util.List;

public interface LuxRecordRepository extends JpaRepository<LuxRecord, Long> {
    @Query("select l from LuxRecord l join l.member m where m.memberSeq=:memberSeq " +
            "and l.time between :startTime and :endTime")
    List<LuxRecord> findByTime(@Param("memberSeq") long memberSeq, @Param("startTime") LocalDateTime startTime,
                               @Param("endTime") LocalDateTime endTime);
}
