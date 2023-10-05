package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.dto.BodyInfoResponseDto;
import site.sleepmate.backend.repository.MemberRepository;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserBodyInfoService {
    private final MemberRepository memberRepository;

    public BodyInfoResponseDto getBodyInfo(final Long memberSeq) {
        final Member member = memberRepository.findById(memberSeq).orElseThrow(
                () -> new IllegalArgumentException("해당하는 유저가 없습니다.")
        );

        return BodyInfoResponseDto.builder()
                .height(member.getHeight())
                .weight(member.getWeight())
                .build();
    }

    public void saveBodyInfo(final Long memberSeq, final Integer weight, final Integer height) {
        Optional<Member> optionalMember = memberRepository.findById(memberSeq);

        if (optionalMember.isPresent()) {
            memberRepository.updateMemberPartialInfo(memberSeq, weight, height);
        } else {
            throw new IllegalArgumentException("해당하는 유저가 없습니다.");
        }
    }
}
