package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.VideoOrder;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.repository.VideoOrderRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RecordToOrderService {
    private final VideoRecordRepository videoRecordRepository;
    private final VideoOrderRepository videoOrderRepository;

    public void getVideoOrder() {
        List<VideoRecord> videoRecords = videoRecordRepository.findAll();
        // 처음 들어온 자세
        Integer temp = videoRecords.get(0).getPosture();
        LocalDateTime startTime = videoRecords.get(0).getTime();
        LocalDateTime endTime = null;
        Integer posture = 0;
        String capture = videoRecords.get(0).getCapture();

        for (int i = 1; i < videoRecords.size(); i++) {
            // 첫 자세 시각, 자세, 자세캡쳐화면만 넣고 객체 생성
            VideoOrder videoOrder = VideoOrder.builder()
                    .startTime(startTime)
                    .endTime(endTime)
                    .posture(posture)
                    .capture(capture)
                    .build();

            if (!Objects.equals(videoRecords.get(i).getPosture(), temp)) {
                videoOrderRepository.save(VideoOrder.builder()
                        .posture(videoRecords.get(i).getPosture())
                        .startTime(videoOrder.getStartTime())
                        .endTime(videoRecords.get(i-1).getTime())
                        .capture(videoRecords.get(i).getCapture())
                        .build());

                temp = videoRecords.get(i).getPosture();
                startTime = videoRecords.get(i).getTime();
                endTime = videoRecords.get(i-1).getTime();
                posture = videoRecords.get(i).getPosture();
                capture = videoRecords.get(i).getCapture();
            }
        }
    }
}

