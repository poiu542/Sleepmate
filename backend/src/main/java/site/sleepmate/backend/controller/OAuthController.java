package site.sleepmate.backend.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.sleepmate.backend.service.OauthService;

@RestController
@AllArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {
    /**
     * 카카오 callback
     * [GET] /oauth/kakao/callback
     */
    private final OauthService oauthService;

    @GetMapping("/kakao")
    public ResponseEntity<String> kakaoCallback(@RequestParam String code) {
        oauthService.createKakaoUser(oauthService.getKakaoAccessToken(code));
        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }
}
