package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.HeartRateRecord;

public interface HeartRateRecordRepository extends JpaRepository<HeartRateRecord, Long> {

}
