package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.VideoRecord;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VideoRecordRepository extends JpaRepository<VideoRecord, Long> {
    //취침 시작 시간의 로그 가져오는 쿼리
    Optional<VideoRecord> findTop1BySleepDateOrderByVideoSeqAsc(LocalDate date);

    //취침 종료 시간의 로그 가져오는 쿼리
    Optional<VideoRecord> findTop1BySleepDateOrderByVideoSeqDesc(LocalDate date);
    Optional<VideoRecord> findTop1ByOrderByVideoSeqDesc();
}
