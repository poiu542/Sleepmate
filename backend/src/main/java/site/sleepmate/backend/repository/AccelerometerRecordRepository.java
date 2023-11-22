package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.AccelerometerRecord;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AccelerometerRecordRepository extends JpaRepository<AccelerometerRecord, Long> {
    List<AccelerometerRecord> findAllByMember_MemberSeqAndSleepDateOrderByTime(final Long memberSeq, final LocalDate date);

    List<AccelerometerRecord> findAllByMember_MemberSeqAndSleepDateOrderByTimeDesc(final Long memberSeq, final LocalDate date);

    Optional<AccelerometerRecord> findTop1ByMember_MemberSeqAndSleepDateOrderByTimeAsc(final Long memberSeq, final LocalDate date);
    Optional<AccelerometerRecord> findTop1ByMember_MemberSeqAndSleepDateOrderByTimeDesc(final Long memberSeq, final LocalDate date);
    Optional<AccelerometerRecord> findTop1ByMember_MemberSeqOrderByTimeDesc(final Long memberSeq);
}
