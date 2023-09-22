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
public class LuxRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lux_seq", updatable = false)
    private Long luxSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberSeq")
    private Member memberSeq;

    @Column(name = "lux", nullable = false)
    private Integer lux;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Builder
    public LuxRecord(Member memberSeq, Integer lux, LocalDateTime time) {
        this.memberSeq = memberSeq;
        this.lux = lux;
        this.time = time;
    }
}
