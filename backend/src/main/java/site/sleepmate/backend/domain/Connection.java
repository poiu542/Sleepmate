package site.sleepmate.backend.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Connection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "connection_seq", updatable = false)
    private Long connectionSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_seq")
    private Member member;

    @Column(name = "state", nullable = false)
    private Boolean state;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Builder
    public Connection(Member member, Boolean state, LocalDateTime time) {
        this.member = member;
        this.state = state;
        this.time = time;
    }
}
