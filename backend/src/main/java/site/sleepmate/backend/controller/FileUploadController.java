package site.sleepmate.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileUploadController {
    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        // 파일을 저장하거나 다른 처리를 수행할 수 있습니다.
        if (!file.isEmpty()) {
            // 파일을 저장하거나 필요한 작업을 수행합니다.
            return "File uploaded successfully";
        } else {
            return "File upload failed";
        }
    }
}
