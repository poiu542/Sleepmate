package site.sleepmate.backend.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    private Member member;

    @Column(name = "lux", nullable = false)
    private Integer lux;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Builder
    public LuxRecord(Member member, Integer lux, LocalDateTime time) {
        this.member = member;
        this.lux = lux;
        this.time = time;
    }
}
