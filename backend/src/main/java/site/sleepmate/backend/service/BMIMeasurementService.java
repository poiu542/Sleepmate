package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.repository.MemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BMIMeasurementService {
    private final MemberRepository memberRepository;

    public Double getBMI(final Long memberSeq) {
        final Member member = memberRepository.findByMemberSeq(memberSeq).orElseThrow(
                () -> new IllegalArgumentException("해당하는 유저가 없습니다.")
        );

        final int weight = member.getWeight();

        // 단위를 m로 변환
        final double height = member.getHeight() * 0.01;

        // 몸무게 제곱
        double bmi = weight / Math.pow(height, 2);

        // 소수점 두자리까지만 표시
        final String bmiStr = String.format("%.2f", bmi);

        // 다시 Double 형으로
        bmi = Double.parseDouble(bmiStr);

        return bmi;
    }
}
