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
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
        LocalDateTime before30MinTime = time.minusMinutes(30); //30분 전 시각
        LocalDateTime startTime = LocalDateTime.of(before30MinTime.getYear(), before30MinTime.getMonthValue(),
                before30MinTime.getDayOfMonth(), before30MinTime.getHour(), before30MinTime.getMinute(), 0);
        LocalDateTime endTime = startTime.plusMinutes(1);
        List<LuxRecord> luxs = luxRecordRepository.findByTime(startTime, endTime);
        LuxRecord lux = luxs.get(0);

        //자러간 시간, 일어난 시간 조회
        LocalDate date = getLastRecord().getSleepDate(); //가장 최근 취침 날짜 가져옴
        VideoRecord startSleep = videoRecordRepository.findTop1BySleepDateOrderByVideoSeqAsc(date).orElseThrow(() ->
                new NoSuchElementException());
        VideoRecord endSleep = videoRecordRepository.findTop1BySleepDateOrderByVideoSeqDesc(date).orElseThrow(() ->
                new NoSuchElementException());

        WakeUpResponseDto wakeUpResponseDto = WakeUpResponseDto.fromEntities(lux, startSleep, endSleep);
        return wakeUpResponseDto;
    }

    public VideoRecord getLastRecord(){
        return videoRecordRepository.findTop1ByOrderByVideoSeqDesc().orElseThrow(() -> new NoSuchElementException());
    }
}
