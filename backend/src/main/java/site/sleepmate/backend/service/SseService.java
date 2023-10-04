package site.sleepmate.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import site.sleepmate.backend.repository.SseRepository;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class SseService {
    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final SseRepository sseRepository;

    public SseEmitter subscribe(Long id) {
        SseEmitter emitter = createEmitter(id);

        sendToClient(id, "EventStream Created. [userSeq=" + id + "]");
        return emitter;
    }

    public void notify(Long id, Object event) {
        sendToClient(id, event);
    }

    private void sendToClient(Long id, Object data) {
        SseEmitter emitter = sseRepository.get(id);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().id(String.valueOf(id)).name("sse").data(data));
            } catch (IOException exception) {
                sseRepository.deleteById(id);
                emitter.completeWithError(exception);
            }
        }
    }

    private SseEmitter createEmitter(Long id) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        sseRepository.save(id, emitter);

        emitter.onCompletion(() -> sseRepository.deleteById(id));
        emitter.onTimeout(() -> sseRepository.deleteById(id));

        return emitter;
    }
}