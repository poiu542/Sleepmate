package site.sleepmate.backend.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_seq", updatable = false)
    private long videoSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberSeq")
    private Member memberSeq;

    @Column(name = "posture", nullable = false)
    private int posture;

    @Column(name = "start_time", nullable = false)
    private int startTime;

    @Column(name = "end_time", nullable = false)
    private int endTime;

    @Column(name = "capture", nullable = false)
    private String capture;

    @Builder
    public VideoRecord(Member memberSeq, int posture, int startTime, int endTime, String capture) {
        this.memberSeq = memberSeq;
        this.posture = posture;
        this.startTime = startTime;
        this.endTime = endTime;
        this.capture = capture;
    }
}
