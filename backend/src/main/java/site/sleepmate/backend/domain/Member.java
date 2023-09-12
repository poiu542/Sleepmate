package site.sleepmate.backend.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
    private String gender;

    @Column(name = "birth", nullable = false)
    private String birth;

    @Column(name = "hasWatch", nullable = false)
    private Boolean hasWatch;

    @Column(name = "manual", nullable = false)
    private Boolean manual;

    @Column(name = "alarm")
    private LocalDateTime alarm;

    @Column(name = "crescendo", nullable = false)
    private Boolean crescendo;

    @Column(name = "isDelecated", nullable = false)
    private Boolean isDelecated;

    @OneToMany(mappedBy = "memberSeq")
    private List<WatchRecord> watchRecords = new ArrayList<WatchRecord>();

    @OneToMany(mappedBy = "memberSeq")
    private List<VideoRecord> videoRecords = new ArrayList<VideoRecord>();

    @Builder

    public Member(String email, String nickname, String gender, String birth, Boolean hasWatch, Boolean manual, LocalDateTime alarm, Boolean crescendo, Boolean isDelecated) {
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
