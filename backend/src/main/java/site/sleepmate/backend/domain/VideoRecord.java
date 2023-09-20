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
public class VideoRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_seq", updatable = false)
    private Long videoSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberSeq")
    private Member memberSeq;

    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @Column(name = "posture", nullable = false)
    private Integer posture;

    @Column(name = "capture", nullable = false)
    private String capture;

    @Builder
    public VideoRecord(Member memberSeq, LocalDateTime time, Integer posture, String capture) {
        this.memberSeq = memberSeq;
        this.time = time;
        this.posture = posture;
        this.capture = capture;
    }
}
