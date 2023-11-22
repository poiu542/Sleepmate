package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.*;
import site.sleepmate.backend.dto.AccelerometerRequestDto;
import site.sleepmate.backend.dto.LuxRequestDto;
import site.sleepmate.backend.dto.WakeUpResponseDto;
import site.sleepmate.backend.dto.watch.ConnectionResponseDto;
import site.sleepmate.backend.repository.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

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
    public WakeUpResponseDto getLuxAndSleepTime(final long memberSeq, final LocalDate sleepDate) {
        final AccelerometerRecord startSleep =
                accelerometerRecordRepository.findTop1ByMember_MemberSeqAndSleepDateOrderByTimeAsc(memberSeq, sleepDate)
                        .orElseThrow(
                                () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                        );

        final AccelerometerRecord endSleep =
                accelerometerRecordRepository.findTop1ByMember_MemberSeqAndSleepDateOrderByTimeDesc(memberSeq, sleepDate)
                        .orElseThrow(
                                () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                        );

        //lux값 조회(해당일자의 마지막 로그에 찍힌 시간 기준)
        final LuxRecord lux = getLuxBefore30Min(endSleep.getTime(), memberSeq);

        return WakeUpResponseDto.fromEntities(lux, startSleep, endSleep);
    }

    private LuxRecord getLuxBefore30Min(final LocalDateTime time, final long memberSeq) {
        //lux값 조회. 조도 값을 30초 간격으로 가져오므로, 1분 시간간격사이에 적어도 하나의 로그 존재
        final LocalDateTime before1MinTime = time.minusMinutes(1); //1분 전 시각(sleepDate를 통해 가져온 시간에서 minus)

        final LocalDateTime startTime = LocalDateTime.of(before1MinTime.getYear(), before1MinTime.getMonthValue(),
                before1MinTime.getDayOfMonth(), before1MinTime.getHour(), before1MinTime.getMinute(), 0);

        final LocalDateTime endTime = startTime.plusMinutes(1);

        final List<LuxRecord> luxRecords = luxRecordRepository.findByTime(memberSeq, startTime, endTime);

        return luxRecords.get(0);
    }

    //일주기 리듬
    public Map<String, Integer> getCircadianRhythm(final long memberSeq, final LocalDate sleepDate) {
        final AccelerometerRecord startSleep =
                accelerometerRecordRepository.findTop1ByMember_MemberSeqAndSleepDateOrderByTimeAsc(memberSeq, sleepDate)
                        .orElseThrow(
                                () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                        );

        final AccelerometerRecord endSleep =
                accelerometerRecordRepository.findTop1ByMember_MemberSeqAndSleepDateOrderByTimeDesc(memberSeq, sleepDate)
                        .orElseThrow(
                                () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                        );

        //당일 새벽 3시(이후에 잠들기 시작하면 일주기 리듬 안좋음)
        final LocalDateTime startMarginalTime =
                LocalDateTime.of(sleepDate.plusDays(1), LocalTime.of(3, 0));

        //당일 아침 10시(이후에 기상하면 일주기 리듬 안좋음)
        final LocalDateTime endMarginalTime =
                LocalDateTime.of(sleepDate.plusDays(1), LocalTime.of(10, 0));

        //새벽 3시 이후 취침했거나, 오전 10시 이후 기상했다면 주의.
        final boolean isRhythmFine = !startSleep.getTime().isAfter(startMarginalTime) && !endSleep.getTime().isAfter(endMarginalTime);

        final LuxRecord lux = getLuxBefore30Min(endSleep.getTime(), memberSeq);

        int result;

        if (!isRhythmFine) { //일주기 리듬 안좋으면
            //조도가 20lux보다 작으면
            result = (lux.getLux() < 20) ? 0 : 1;
        } else {
            result = (lux.getLux() < 20) ? 2 : 3;
        }

        final Map<String, Integer> resultMap = new HashMap<>();

        resultMap.put("rhythm", result);

        return resultMap;
    }

    @Transactional
    public void saveLuxData(final LuxRequestDto luxRequestDto){
        final Member member = memberRepository.findByMemberSeq(luxRequestDto.getMemberSeq())
                .orElseThrow(NoSuchElementException::new);

        final LuxRecord luxRecord = luxRequestDto.toEntity(luxRequestDto, member);

        luxRecordRepository.save(luxRecord);
    }

    @Transactional
    public void saveAccelerometerData(final AccelerometerRequestDto accelerometerRequestDto){
        final Member member = memberRepository.findByMemberSeq(accelerometerRequestDto.getMemberSeq())
                .orElseThrow(NoSuchElementException::new);

        final AccelerometerRecord accelerometerRecord = accelerometerRequestDto.toEntity(accelerometerRequestDto, member);

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

    public ConnectionResponseDto isConnected(final Long memberSeq) {
        final Connection connection = connectionRepository.findTop1ByMember_MemberSeqOrderByTimeDesc(memberSeq)
                .orElseThrow(() -> new IllegalArgumentException("최근 connection이 없습니다."));

        final boolean isConnected = connection.getState();

        return ConnectionResponseDto.builder()
                .connection(isConnected)
                .build();
    }

    public ConnectionResponseDto isSendingData(final Long memberSeq) {
        final AccelerometerRecord accelerometerRecord =
                accelerometerRecordRepository.findTop1ByMember_MemberSeqOrderByTimeDesc(memberSeq).orElseThrow(
                        () -> new IllegalArgumentException("최근 Accelerometer 레코드가 없습니다.")
                );

        final LocalDateTime localDateTime = accelerometerRecord.getTime();

        final boolean isConnected = LocalDateTime.now().minusSeconds(5).isBefore(localDateTime);

        return ConnectionResponseDto.builder()
                .connection(isConnected)
                .build();
    }
}
