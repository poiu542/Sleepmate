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
public class VideoRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_seq", updatable = false)
    private Long videoSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_seq")
    private Member member;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Column(name = "posture", nullable = false)
    private Integer posture;

    @Column(name = "capture", nullable = false)
    private String capture;

    @Column(name = "sleep_date", nullable = false)
    private LocalDate sleepDate;

    @Builder
    public VideoRecord(Member member, LocalDateTime time, Integer posture, String capture, LocalDate sleepDate) {
        this.member = member;
        this.time = time;
        this.posture = posture;
        this.capture = capture;
        this.sleepDate = sleepDate;
    }

    public void updateCapture(final String capture) {
        this.capture = capture;
    }
}
