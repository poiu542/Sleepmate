package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.dto.PosturePercentageDto;
import site.sleepmate.backend.dto.PostureResponseDto;
import site.sleepmate.backend.repository.VideoOrderRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostureService {
    private final VideoOrderRepository videoOrderRepository;
    private final VideoRecordRepository videoRecordRepository;
    public List<PostureResponseDto> getChangeHistory(Long memberSeq, LocalDate date){
        return videoOrderRepository.findBySleepDateAndMember_MemberSeq(date, memberSeq, Sort.by("startTime"));
    }

    public PosturePercentageDto getMostFrequentPosture(Long memberSeq, LocalDate date){
        //0~8 포즈 집계
        PosturePercentageDto[] postures = new PosturePercentageDto[9];
        int totalCount = videoRecordRepository.countBySleepDateAndMember_MemberSeq(date, memberSeq);
        for(int posture = 0; posture < 9; posture++){
            int postureCount = videoRecordRepository.countBySleepDateAndPostureAndMember_MemberSeq(date, posture, memberSeq);
            double percentage = (double) postureCount / totalCount;
            postures[posture] = new PosturePercentageDto(posture, percentage);
        }
        Arrays.sort(postures);
        return postures[postures.length-1];
    }

    public List<PosturePercentageDto> getPostures(Long memberSeq, LocalDate date){
        List<PosturePercentageDto> postures = new ArrayList<>();
        int totalCount = videoRecordRepository.countBySleepDateAndMember_MemberSeq(date, memberSeq);
        for(int posture = 0; posture < 9; posture++){
            int postureCount = videoRecordRepository.countBySleepDateAndPostureAndMember_MemberSeq(date, posture, memberSeq);
            double percentage = (double) postureCount / totalCount;
            postures.add(new PosturePercentageDto(posture, percentage));
        }
        return postures;
    }
}
