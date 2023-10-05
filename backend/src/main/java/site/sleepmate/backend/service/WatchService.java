package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import site.sleepmate.backend.domain.*;
import site.sleepmate.backend.dto.AccelerometerRequestDto;
import site.sleepmate.backend.dto.LuxRequestDto;
import site.sleepmate.backend.dto.WakeUpResponseDto;
import site.sleepmate.backend.dto.watch.ConnectionRequestDto;
import site.sleepmate.backend.dto.watch.ConnectionResponseDto;
import site.sleepmate.backend.repository.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WatchService {
    private final LuxRecordRepository luxRecordRepository;
    private final ConnectionRepository connectionRepository;
    private final VideoRecordRepository videoRecordRepository;
    private final MemberRepository memberRepository;
    private final AccelerometerRecordRepository accelerometerRecordRepository;

    //30분 전의 lux값과 자러간 시간, 일어난 시간 반환.
    public WakeUpResponseDto getLuxAndSleepTime(long memberSeq, LocalDate sleepDate){
        VideoRecord startSleep = videoRecordRepository.findTop1BySleepDateAndMember_MemberSeqOrderByVideoSeqAsc(sleepDate, memberSeq).orElseThrow(NoSuchElementException::new);
        VideoRecord endSleep = videoRecordRepository.findTop1BySleepDateAndMember_MemberSeqOrderByVideoSeqDesc(sleepDate, memberSeq).orElseThrow(NoSuchElementException::new);
        //lux값 조회(해당일자의 마지막 로그에 찍힌 시간 기준)
        LuxRecord lux = getLuxBefore30Min(endSleep.getTime(), memberSeq, sleepDate);

        return WakeUpResponseDto.fromEntities(lux, startSleep, endSleep);
    }

    public VideoRecord getLastRecord(long memberSeq, LocalDate sleepDate){
        return videoRecordRepository.findTop1BySleepDateAndMember_MemberSeqOrderByVideoSeqDesc(sleepDate, memberSeq).orElseThrow(NoSuchElementException::new);
    }

    private LuxRecord getLuxBefore30Min(LocalDateTime time, long memberSeq, LocalDate sleepDate){
        //lux값 조회. 조도 값을 30초 간격으로 가져오므로, 1분 시간간격사이에 적어도 하나의 로그 존재
        LocalDateTime before30MinTime = time.minusMinutes(1); //1분 전 시각(sleepDate를 통해 가져온 시간에서 minus)
        LocalDateTime startTime = LocalDateTime.of(before30MinTime.getYear(), before30MinTime.getMonthValue(),
                before30MinTime.getDayOfMonth(), before30MinTime.getHour(), before30MinTime.getMinute(), 0);
        LocalDateTime endTime = startTime.plusMinutes(1);
        List<LuxRecord> luxs = luxRecordRepository.findByTime(memberSeq, startTime, endTime);
        return luxs.get(0);
    }

    //일주기 리듬
    public Map<String, Integer> getCircadianRhythm(long memberSeq, LocalDate sleepDate){
        VideoRecord startSleep = videoRecordRepository.findTop1BySleepDateAndMember_MemberSeqOrderByVideoSeqAsc(sleepDate, memberSeq).orElseThrow(NoSuchElementException::new);
        VideoRecord endSleep = videoRecordRepository.findTop1BySleepDateAndMember_MemberSeqOrderByVideoSeqDesc(sleepDate, memberSeq).orElseThrow(NoSuchElementException::new);
        //당일 새벽 3시(이후에 잠들기 시작하면 일주기 리듬 안좋음)
        LocalDateTime startMarginalTime = LocalDateTime.of(sleepDate.plusDays(1), LocalTime.of(3, 0));
        //당일 아침 10시(이후에 기상하면 일주기 리듬 안좋음)
        LocalDateTime endMarginalTime = LocalDateTime.of(sleepDate.plusDays(1), LocalTime.of(10, 0));

        boolean isRhythmFine = true;
        //새벽 3시 이후 취침했거나, 오전 10시 이후 기상했다면 주의.
        if(startSleep.getTime().isAfter(startMarginalTime) || endSleep.getTime().isAfter(endMarginalTime)){
            isRhythmFine = false;
        }
        LuxRecord lux = getLuxBefore30Min(endSleep.getTime(), memberSeq, sleepDate);

        int result = -1;
        if(!isRhythmFine){ //일주기 리듬 안좋으면
            //조도가 50lux보다 작으면
            result = (lux.getLux() < 50) ? 0 : 1;
        } else{
            result = (lux.getLux() < 50) ? 2 : 3;
        }

        Map<String, Integer> resultMap = new HashMap<>();
        resultMap.put("rhythm", result);
        return resultMap;
    }

    @Transactional
    public void saveLuxData(LuxRequestDto luxRequestDto){
        Member member = memberRepository.findByMemberSeq(luxRequestDto.getMemberSeq()).orElseThrow(() ->
                new NoSuchElementException());
        LuxRecord luxRecord = luxRequestDto.toEntity(luxRequestDto, member);
        luxRecordRepository.save(luxRecord);
    }

    @Transactional
    public void saveAccelerometerData(AccelerometerRequestDto accelerometerRequestDto){
        Member member = memberRepository.findByMemberSeq(accelerometerRequestDto.getMemberSeq()).orElseThrow(() ->
                new NoSuchElementException());
        System.out.println(accelerometerRequestDto.getMvalue());
        AccelerometerRecord accelerometerRecord = accelerometerRequestDto.toEntity(accelerometerRequestDto, member);
        accelerometerRecordRepository.save(accelerometerRecord);
    }

    @Transactional
    public void connection(final Long memberSeq) {
        final Member member = memberRepository.findByMemberSeq(memberSeq).orElseThrow(
                () -> new IllegalArgumentException("해당하는 유저가 없습니다.")
        );

        final Connection connection = Connection.builder()
                .member(member)
                .state(true)
                .time(LocalDateTime.now())
                .build();

        connectionRepository.save(connection);
    }

    @Transactional
    public void disconnection(final Long memberSeq) {
        final Member member = memberRepository.findByMemberSeq(memberSeq).orElseThrow(
                () -> new IllegalArgumentException("해당하는 유저가 없습니다.")
        );

        final Connection connection = Connection.builder()
                .member(member)
                .state(false)
                .time(LocalDateTime.now())
                .build();

        connectionRepository.save(connection);
    }
}
