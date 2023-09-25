package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.HeartRateRecord;

import java.time.LocalDate;
import java.util.List;

public interface HeartRateRecordRepository extends JpaRepository<HeartRateRecord, Integer> {
    List<HeartRateRecord> findAllBySleepDateOrderByTime(LocalDate sleepDate);
}
