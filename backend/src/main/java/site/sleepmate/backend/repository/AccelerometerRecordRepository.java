package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.AccelerometerRecord;

import java.time.LocalDate;
import java.util.List;

public interface AccelerometerRecordRepository extends JpaRepository<AccelerometerRecord, Long> {
    List<AccelerometerRecord> findAllByMember_MemberSeqAndSleepDateOrderByTime(final Long memberSeq, final LocalDate date);
}
