package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.AccelerometerRecord;

public interface AccelerometerRecordRepository extends JpaRepository<AccelerometerRecord, Long> {

}
