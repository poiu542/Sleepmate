package site.sleepmate.backend.domain;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_order_seq", updatable = false)
    private Long videoOrderSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberSeq")
    private Member member;

    @Column(name = "posture", nullable = false)
    private Integer posture;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "capture", nullable = false)
    private String capture;

    @Builder
    public VideoOrder(Member member, Integer posture, LocalDateTime startTime, LocalDateTime endTime, String capture) {
        this.member = member;
        this.startTime = startTime;
        this.endTime = endTime;
        this.posture = posture;
        this.capture = capture;
    }
}
