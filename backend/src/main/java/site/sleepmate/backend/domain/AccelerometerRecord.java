package site.sleepmate.backend.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccelerometerRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accelerometer_seq", updatable = false)
    private Long accelerometerSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_seq")
    private Member member;

    @Column(name = "m_value", nullable = false)
    private Double mValue;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    public AccelerometerRecord(Member member, Double mValue, LocalDateTime time) {
        this.member = member;
        this.mValue = mValue;
        this.time = time;
    }
}
