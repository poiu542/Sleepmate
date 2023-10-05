package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import site.sleepmate.backend.domain.AccelerometerRecord;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.dto.PosturePercentageDto;
import site.sleepmate.backend.dto.PostureResponseDto;
import site.sleepmate.backend.dto.VideoRecordRequestDto;
import site.sleepmate.backend.dto.posture.CheckRemSleepBehaviorDisorderResponseDto;
import site.sleepmate.backend.dto.posture.PostureRealResponseDto;
import site.sleepmate.backend.properties.AwsS3Properties;
import site.sleepmate.backend.repository.AccelerometerRecordRepository;
import site.sleepmate.backend.repository.MemberRepository;
import site.sleepmate.backend.repository.VideoOrderRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;
import site.sleepmate.backend.util.AwsS3Manager;
import site.sleepmate.backend.util.FileUtility;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.UnaryOperator;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostureService {
    private final VideoOrderRepository videoOrderRepository;
    private final VideoRecordRepository videoRecordRepository;
    private final AccelerometerRecordRepository accelerometerRecordRepository;
    private final MemberRepository memberRepository;

    private final AwsS3Manager awsS3Manager;
    private final AwsS3Properties awsS3Properties;

    public List<PostureRealResponseDto> getChangeHistory(final Long memberSeq, final LocalDate date){
        List<PostureResponseDto> postureResponseDtoList =
                videoOrderRepository.findBySleepDateAndMember_MemberSeq(date, memberSeq, Sort.by("startTime"));

        List<PostureRealResponseDto> responseDtoList = new ArrayList<>();

        for (final PostureResponseDto responseDto : postureResponseDtoList) {
            PostureRealResponseDto realResponseDto = PostureRealResponseDto.builder()
                    .posture(responseDto.getPosture())
                    .time(responseDto.getTime().toString())
                    .capture(responseDto.getCapture())
                    .build();

            responseDtoList.add(realResponseDto);
        }

        return responseDtoList;
    }

    public PosturePercentageDto getMostFrequentPosture(final Long memberSeq, final LocalDate date){
        //0~8 포즈 집계
        final PosturePercentageDto[] postures = new PosturePercentageDto[9];

        final int totalCount = videoRecordRepository.countBySleepDateAndMember_MemberSeq(date, memberSeq);

        for(int posture = 0; posture < 9; posture++){
            final int postureCount = videoRecordRepository.countBySleepDateAndPostureAndMember_MemberSeq(date, posture, memberSeq);

            final double percentage = (double) postureCount / totalCount;

            postures[posture] = new PosturePercentageDto(posture, percentage);
        }

        Arrays.sort(postures);

        return postures[postures.length-1];
    }

    public List<PosturePercentageDto> getPostures(final Long memberSeq, final LocalDate date){
        final List<PosturePercentageDto> postures = new ArrayList<>();

        final int totalCount = videoRecordRepository.countBySleepDateAndMember_MemberSeq(date, memberSeq);

        for (int posture = 0; posture < 9; posture++) {
            final int postureCount = videoRecordRepository.countBySleepDateAndPostureAndMember_MemberSeq(date, posture, memberSeq);

            final double percentage = (double) postureCount / totalCount;

            postures.add(new PosturePercentageDto(posture, percentage));
        }

        return postures;
    }

    public Map<String, Integer> getChangeCount(final Long memberSeq, final LocalDate date){
        final int changeCount = videoOrderRepository.countBySleepDateAndMember_MemberSeq(date, memberSeq);

        final Map<String, Integer> result = new HashMap<>();

        result.put("result", changeCount);

        return result;
    }

    @Transactional
    public void savePosturePicture(final Long memberSeq, final LocalDateTime sleepdatetime, final MultipartFile picture) {
        final VideoRecord videoRecord = videoRecordRepository.findAllByMember_MemberSeqAndTime(memberSeq, sleepdatetime)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 자세 로그가 없습니다."));

        final String contentType = picture.getContentType();

        if (contentType == null) {
            throw new IllegalArgumentException("CONTENT_TYPE이 존재하지 않습니다.");
        }

        if (!contentType.matches("(^image)(/)\\w*")) {
            throw new IllegalArgumentException("지원하지 않는 형식의 CONTENT_TYPE입니다.");
        }

        final UnaryOperator<String> titleGenerator = createPictureTitleGenerator(memberSeq,
                String.valueOf(sleepdatetime.toLocalDate()), String.valueOf(sleepdatetime));

        final String picturePath = awsS3Manager.uploadFiles(titleGenerator, List.of(picture)).get(0);

        String storageUrl = awsS3Properties.getUrl();

        if (!storageUrl.endsWith("/")) {
            storageUrl += '/';
        }

        videoRecord.updateCapture(storageUrl + picturePath);
    }

    public static UnaryOperator<String> createPictureTitleGenerator(final Long memberSeq, final String sleepdate, final String sleepdatetime) {
        return originalFileName -> memberSeq + "/" + sleepdate + "/" + sleepdatetime + FileUtility.getFileExtension(originalFileName);
    }

    public CheckRemSleepBehaviorDisorderResponseDto checkRemSleepBehaviorDisorder(final Long memberSeq, final LocalDate date) {
        final List<AccelerometerRecord> accelerometerRecordList = accelerometerRecordRepository
                .findAllByMember_MemberSeqAndSleepDateOrderByTime(memberSeq, date);

        int abnormalCnt = 0;

        String result;

        if (accelerometerRecordList.isEmpty()) {
            throw new IllegalArgumentException("해당하는 날에는 기록이 존재하지 않습니다.");
        }

        for (final AccelerometerRecord accelerometerRecord : accelerometerRecordList) {
            if (accelerometerRecord.getMValue() >= 15) {
                abnormalCnt++;
            }
        }

        if (abnormalCnt > 5) {
            result = "high";
        } else if (abnormalCnt > 1) {
            result = "middle";
        } else {
            result = "low";
        }

        return CheckRemSleepBehaviorDisorderResponseDto.builder()
                .disorderState(result)
                .build();
    }

    @Transactional
    public void saveVideoRecord(final VideoRecordRequestDto videoRecordRequestDto){
        final Member member = memberRepository.findByMemberSeq(videoRecordRequestDto.getMemberSeq())
                .orElseThrow(NoSuchElementException::new);

        final VideoRecord videoRecord = videoRecordRequestDto.toEntity(videoRecordRequestDto, member);

        videoRecordRepository.save(videoRecord);
    }
}
