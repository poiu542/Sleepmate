package site.sleepmate.backend.dto.posture;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
public class SavePosturePictureRequestDto {
    private Long memberSeq;
    private LocalDateTime sleepdatetime;
    private MultipartFile picture;
}
