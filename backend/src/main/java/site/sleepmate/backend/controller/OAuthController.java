package site.sleepmate.backend.controller;


import lombok.AllArgsConstructor;
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
    @ResponseBody
    @GetMapping("/kakao")
    public void kakaoCallback(@RequestParam String code) {
        System.out.println(code);
        OauthService oauthService = new OauthService();
        oauthService.createKakaoUser(oauthService.getKakaoAccessToken(code));
    }
}
