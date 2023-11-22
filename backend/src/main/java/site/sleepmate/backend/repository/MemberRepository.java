package site.sleepmate.backend.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import site.sleepmate.backend.domain.Member;

import java.time.LocalTime;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>{
    Optional<Member> findByMemberSeq(Long memberSeq);
    boolean existsByKakaoId(Long kakaoId);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.weight = :weight, m.height = :height WHERE m.memberSeq = :memberSeq")
    void updateMemberPartialInfo(@Param("memberSeq") Long memberSeq, @Param("weight") Integer weight, @Param("height") Integer height);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.alarm = :alarm WHERE m.memberSeq = :memberSeq")
    void updateMemberAlarmInfo(@Param("memberSeq") Long memberSeq, @Param("alarm") LocalTime alarm);
}
