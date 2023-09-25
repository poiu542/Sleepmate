package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.VideoOrder;

public interface VideoOrderRepository extends JpaRepository<VideoOrder, Long> {

}
