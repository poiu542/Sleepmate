package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Integer>{
}
