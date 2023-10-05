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

    @Column(name = "sleep_date", nullable = false)
    private LocalDate sleepDate;

    @Builder
    public AccelerometerRecord(Member member, Double mValue, LocalDateTime time, LocalDate sleepDate) {
        this.member = member;
        this.mValue = mValue;
        this.time = time;
        this.sleepDate = sleepDate;
    }
}
