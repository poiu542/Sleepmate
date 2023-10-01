package site.sleepmate.backend.service;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.sleepmate.backend.domain.Member;
import site.sleepmate.backend.repository.MemberRepository;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Time;

@Service
@RequiredArgsConstructor
public class OauthService {
    private final MemberRepository memberRepository;
    public String getKakaoAccessToken(String code) throws IOException {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";


        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        String sb = "grant_type=authorization_code" +
                "&client_id=1e4417060773b8517915b413b7a1942d" + // TODO REST_API_KEY 입력
                "&redirect_uri=http://localhost:8080/oauth/kakao" + // TODO 인가코드 받은 redirect_uri 입력
                "&code=" + code;
        bw.write(sb);
        bw.flush();

        //결과 코드가 200이라면 성공
        int responseCode = conn.getResponseCode();
        System.out.println("responseCode : " + responseCode);

        //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        String result = "";

        while ((line = br.readLine()) != null) {
            result += line;
        }
        System.out.println("response body : " + result);

        //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
        JsonElement element = JsonParser.parseString(result);
        access_Token = element.getAsJsonObject().get("access_token").getAsString();
        System.out.println("access_token : " + access_Token);

        br.close();
        bw.close();


        return access_Token;
    }

    public void createKakaoUser(String token) throws IOException {
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        //access_token을 이용하여 사용자 정보 조회

        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

        //결과 코드가 200이라면 성공
        int responseCode = conn.getResponseCode();
        System.out.println("responseCode : " + responseCode);

        //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        String result = "";

        while ((line = br.readLine()) != null) {
            result += line;
        }

        System.out.println("response body : " + result);

        //Gson 라이브러리로 JSON파싱
        JsonElement element = JsonParser.parseString(result);
        JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();

        boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
        boolean hasAgeRange = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_age_range").getAsBoolean();
        boolean hasGender = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_gender").getAsBoolean();

        String email = "";
        String nickname = properties.getAsJsonObject().get("nickname").getAsString();
        String ageRange = "";
        String gender = "";
        String id = element.getAsJsonObject().get("id").getAsString();

        if (hasEmail) {
            email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
        }

        if (hasAgeRange) {
            ageRange = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("age_range").getAsString();
        }

        if (hasGender) {
            gender = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("gender").getAsString();
        }

        System.out.println("email : " + email);
        System.out.println("nickname : " + nickname);
        System.out.println("ageRange : " + ageRange);
        System.out.println("gender = " + gender);
        System.out.println("id = " + id);

        if (!memberRepository.existsByKakaoId(Long.valueOf(id))) {
            memberRepository.save(Member.builder()
                    .email(email)
                    .nickname(nickname)
                    .gender(gender)
                    .ageRange(ageRange)
                    .hasWatch(false)
                    .alarm(Time.valueOf("07:00:00"))
                    .noServey(true)
                    .weight(60)
                    .height(170)
                    .kakaoId(Long.valueOf(id))
                    .visit(true)
                    .build());
        }
        br.close();
    }
}
