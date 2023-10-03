package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.repository.MemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BMIMeasurementService {
    private final MemberRepository memberRepository;

    public Double getBMI(Long memberSeq) {
        Optional<Member> memberInfo = memberRepository.findByMemberSeq(memberSeq);
        int weight = memberInfo.get().getWeight();
        // 단위를 m로 변환
        double height = memberInfo.get().getHeight() * 0.01;
        // 몸무게 제곱
        double bmi = weight / Math.pow(height, 2);
        // 소수점 두자리까지만 표시
        String bmiStr = String.format("%.2f", bmi);
        // 다시 Double 형으로
        bmi = Double.parseDouble(bmiStr);
        return bmi;
    }
}
