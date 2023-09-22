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
public class HeartRateRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "heart_rate_seq", updatable = false)
    private Long heartRateSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberSeq")
    private Member memberSeq;

    @Column(name = "heart_rate", nullable = false)
    private Double heartRate;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Builder
    public HeartRateRecord(Member memberSeq, Double heartRate, LocalDateTime time) {
        this.memberSeq = memberSeq;
        this.heartRate = heartRate;
        this.time = time;
    }
}
