package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sleepmate.backend.domain.LuxRecord;
import site.sleepmate.backend.domain.VideoRecord;
import site.sleepmate.backend.dto.WakeUpResponseDto;
import site.sleepmate.backend.repository.LuxRecordRepository;
import site.sleepmate.backend.repository.VideoOrderRepository;
import site.sleepmate.backend.repository.VideoRecordRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WatchService {
    private final LuxRecordRepository luxRecordRepository;
    private final VideoOrderRepository videoOrderRepository;
    private final VideoRecordRepository videoRecordRepository;

    //30분 전의 lux값과 자러간 시간, 일어난 시간 반환.
    public WakeUpResponseDto getLuxAndSleepTime(LocalDateTime time){
        //lux값 조회
        LuxRecord lux = getLuxBefore30Min(time);
        //자러간 시간, 일어난 시간 조회
        LocalDate date = getLastRecord().getSleepDate(); //가장 최근 취침 날짜 가져옴
        VideoRecord startSleep = videoRecordRepository.findTop1BySleepDateOrderByVideoSeqAsc(date).orElseThrow(NoSuchElementException::new);
        VideoRecord endSleep = videoRecordRepository.findTop1BySleepDateOrderByVideoSeqDesc(date).orElseThrow(NoSuchElementException::new);

        return WakeUpResponseDto.fromEntities(lux, startSleep, endSleep);
    }

    public VideoRecord getLastRecord(){
        return videoRecordRepository.findTop1ByOrderByVideoSeqDesc().orElseThrow(NoSuchElementException::new);
    }

    private LuxRecord getLuxBefore30Min(LocalDateTime time){
        //lux값 조회
        LocalDateTime before30MinTime = time.minusMinutes(30); //30분 전 시각
        LocalDateTime startTime = LocalDateTime.of(before30MinTime.getYear(), before30MinTime.getMonthValue(),
                before30MinTime.getDayOfMonth(), before30MinTime.getHour(), before30MinTime.getMinute(), 0);
        LocalDateTime endTime = startTime.plusMinutes(1);
        List<LuxRecord> luxs = luxRecordRepository.findByTime(startTime, endTime);
        return luxs.get(0);
    }

    //일주기 리듬
    public Map<String, Integer> getCircadianRhythm(){
        LocalDate date = getLastRecord().getSleepDate();
        VideoRecord startSleep = videoRecordRepository.findTop1BySleepDateOrderByVideoSeqAsc(date).orElseThrow(NoSuchElementException::new);
        VideoRecord endSleep = videoRecordRepository.findTop1BySleepDateOrderByVideoSeqDesc(date).orElseThrow(NoSuchElementException::new);
        //당일 새벽 3시(이후에 잠들기 시작하면 일주기 리듬 안좋음)
        LocalDateTime startMarginalTime = LocalDateTime.of(date.plusDays(1), LocalTime.of(3, 0));
        //당일 아침 10시(이후에 기상하면 일주기 리듬 안좋음)
        LocalDateTime endMarginalTime = LocalDateTime.of(date.plusDays(1), LocalTime.of(10, 0));

        boolean isRhythmFine = true;
        //새벽 3시 이후 취침했거나, 오전 10시 이후 기상했다면 주의.
        if(startSleep.getTime().isAfter(startMarginalTime) || endSleep.getTime().isAfter(endMarginalTime)){
            isRhythmFine = false;
        }
        LuxRecord lux = getLuxBefore30Min(endSleep.getTime());

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
}
