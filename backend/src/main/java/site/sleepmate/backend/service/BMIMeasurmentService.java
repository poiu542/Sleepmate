package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class BMIMeasurmentService {
    private final MemberRepository memberRepository;

    public Double getBMI(Member member) {
        Member memberInfo = memberRepository.findByMemberSeq(member.getMemberSeq());
        int weight = memberInfo.getWeight();
        double height = memberInfo.getHeight() * 0.01;
        double bmi = weight / Math.pow(height, 2);

        String bmiStr = String.format("%.2f", bmi);

        bmi = Integer.parseInt(bmiStr);

        return bmi;
    }
}
