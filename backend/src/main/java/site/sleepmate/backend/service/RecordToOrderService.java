package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.domain.VideoOrder;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.repository.MemberRepository;
import site.sleepmate.backend.repository.VideoOrderRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecordToOrderService {
    private final VideoRecordRepository videoRecordRepository;
    private final MemberRepository memberRepository;
    private final VideoOrderRepository videoOrderRepository;

    public void getVideoOrder(Long memberSeq, LocalDate sleepDate) {
        List<VideoRecord> videoRecords = videoRecordRepository.findAllByMember_MemberSeqAndSleepDateOrderByTimeAsc(memberSeq, sleepDate);
        Member member = memberRepository.findById(memberSeq).orElseThrow(NoSuchElementException::new);
        // 처음 들어온 자세
        Integer temp = videoRecords.get(0).getPosture();
        LocalDateTime startTime = videoRecords.get(0).getTime();
        String capture = videoRecords.get(0).getCapture();

        for (int i = 1; i < videoRecords.size(); i++) {
            // 첫 자세 시각, 자세, 자세캡쳐화면만 넣고 객체 생성
            VideoOrder videoOrder = VideoOrder.builder()
                    .posture(temp)
                    .startTime(startTime)
                    .endTime(null)
                    .capture(capture)
                    .member(member)
                    .sleepDate(sleepDate)
                    .build();

            if (!videoRecords.get(i).getPosture().equals(temp)) {
                videoOrderRepository.save(VideoOrder.builder()
                        .posture(videoOrder.getPosture())
                        .startTime(videoOrder.getStartTime())
                        .endTime(videoRecords.get(i-1).getTime())
                        .capture(videoOrder.getCapture())
                        .member(member)
                        .sleepDate(sleepDate)
                        .build());

                temp = videoRecords.get(i).getPosture();
                startTime = videoRecords.get(i).getTime();
                capture = videoRecords.get(i).getCapture();
            }
        }
    }
}

