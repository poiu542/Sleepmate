package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.VideoRecord;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VideoRecordRepository extends JpaRepository<VideoRecord, Long> {
    List<VideoRecord> findAllByMember_MemberSeqOrderBySleepDateAsc(Long memberSeq);

    List<VideoRecord> findAllByMember_MemberSeqAndSleepDateOrderByTimeAsc(Long memberSeq, LocalDate localDate);

    List<VideoRecord> findAllByMember_MemberSeqAndSleepDate(Long memberSeq, LocalDate sleepDate);

    Optional<VideoRecord> findAllByMember_MemberSeqAndTime(Long memberSeq, LocalDateTime time);

    int countBySleepDateAndMember_MemberSeq(LocalDate sleepDate, Long memberSeq);
    int countBySleepDateAndPostureAndMember_MemberSeq(LocalDate sleepDate, int posture, Long memberSeq);
}
