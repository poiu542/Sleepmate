package site.sleepmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sleepmate.backend.domain.Connection;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {
}
