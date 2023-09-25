package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import site.sleepmate.backend.domain.LuxRecord;

import java.time.LocalDateTime;
import java.util.List;

public interface LuxRecordRepository extends JpaRepository<LuxRecord, Long> {
    @Query("select l from LuxRecord l where l.time between :startTime and :endTime")
    List<LuxRecord> findByTime(@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);
}
