package site.sleepmate.backend.domain;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoRecordLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_log_seq", updatable = false)
    private Long videoLogSeq;

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
    public VideoRecordLog(Member memberSeq, LocalDateTime time, Integer posture, String capture) {
        this.memberSeq = memberSeq;
        this.time = time;
        this.posture = posture;
        this.capture = capture;
    }
}
