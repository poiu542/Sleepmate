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

    @Column(name = "age_range", nullable = false)
    private String ageRange;

    @Column(name = "has_watch", nullable = false)
    private Boolean hasWatch;

    @Column(name = "no_survey", nullable = false)
    private Boolean noServey;

    @Column(name = "alarm", nullable = false)
    private Time alarm;

    @Column(name = "crescendo", nullable = false)
    private Boolean crescendo;

    @Column(name = "height", nullable = false)
    private Integer height;

    @Column(name = "weight", nullable = false)
    private Integer weight;

    @OneToMany(mappedBy = "member")
    private List<HeartRateRecord> heartRateRecords = new ArrayList<HeartRateRecord>();

    @OneToMany(mappedBy = "member")
    private List<VideoRecord> videoRecords = new ArrayList<VideoRecord>();

    @OneToMany(mappedBy = "member")
    private List<LuxRecord> luxRecords = new ArrayList<LuxRecord>();

    @OneToMany(mappedBy = "member")
    private List<VideoOrder> videoOrders = new ArrayList<VideoOrder>();

    @OneToMany(mappedBy = "member")
    private List<AccelerometerRecord> accelerometerRecords = new ArrayList<AccelerometerRecord>();

    @Builder
    public Member(String email, String nickname, String gender, String ageRange, Boolean hasWatch, Boolean noServey, Time alarm, Boolean crescendo, Integer height, Integer weight) {
        this.email = email;
        this.nickname = nickname;
        this.gender = gender;
        this.ageRange = ageRange;
        this.hasWatch = hasWatch;
        this.noServey = noServey;
        this.alarm = alarm;
        this.crescendo = crescendo;
        this.height = height;
        this.weight = weight;
    }
}
