package site.sleepmate.backend.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_seq", updatable = false)
    private Long memberSeq;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "gender", nullable = false)
    private char gender;

    @Column(name = "birth", nullable = false)
    private String birth;

    @Column(name = "hasWatch", nullable = false)
    private boolean hasWatch;

    @Column(name = "manual", nullable = false)
    private boolean manual;

    @Column(name = "alarm")
    private LocalDateTime alarm;

    @Column(name = "crescendo", nullable = false)
    private boolean crescendo;

    @Column(name = "isDelecated", nullable = false)
    private boolean isDelecated;

    @Builder
    public Member(String email, String nickname, char gender, String birth, boolean hasWatch, boolean manual, LocalDateTime alarm, boolean crescendo, boolean isDelecated) {
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.birth = birth;
        this.hasWatch = hasWatch;
        this.manual = manual;
        this.alarm = alarm;
        this.crescendo = crescendo;
        this.isDelecated = isDelecated;
    }
}
