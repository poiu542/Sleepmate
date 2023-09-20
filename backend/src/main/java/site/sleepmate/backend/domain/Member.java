package site.sleepmate.backend.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Time;
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

    @Column(name = "birthyear", nullable = false)
    private String birthYear;

    @Column(name = "has_watch", nullable = false)
    private Boolean hasWatch;

    @Column(name = "no_survey", nullable = false)
    private Boolean noServey;

    @Column(name = "alarm", nullable = false)
    @ColumnDefault("07:00:00")
    private Time alarm;

    @Column(name = "crescendo", nullable = false)
    private Boolean crescendo;

    @OneToMany(mappedBy = "memberSeq")
    private List<WatchRecord> watchRecords = new ArrayList<WatchRecord>();

    @OneToMany(mappedBy = "memberSeq")
    private List<VideoRecord> videoRecords = new ArrayList<VideoRecord>();

    @Builder
    public Member(String email, String nickname, String gender, String birthYear, Boolean hasWatch, Boolean noServey, Time alarm, Boolean crescendo) {
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.birthYear = birthYear;
        this.hasWatch = hasWatch;
        this.noServey = noServey;
        this.alarm = alarm;
        this.crescendo = crescendo;
    }
}
