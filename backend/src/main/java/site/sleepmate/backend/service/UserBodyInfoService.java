package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.dto.BodyInfoResponseDto;
import site.sleepmate.backend.repository.MemberRepository;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserBodyInfoService {
    private final MemberRepository memberRepository;
    public BodyInfoResponseDto getBodyInfo(Long memberSeq) {
        Optional<Member> member = memberRepository.findById(memberSeq);

        return BodyInfoResponseDto.builder()
                .height(member.get().getHeight())
                .weight(member.get().getWeight())
                .build();
    }

    public void saveBodyInfo(Long memberSeq, Integer weight, Integer height) throws IOException {
        Optional<Member> optionalMember = memberRepository.findById(memberSeq);

        if (optionalMember.isPresent()) {
            memberRepository.updateMemberPartialInfo(memberSeq, weight, height);
        } else {
            throw new IOException("멤버를 찾을 수 없습니다.");
        }
    }
}
