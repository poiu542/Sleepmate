package site.sleepmate.backend.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "aws")
@RequiredArgsConstructor
@Getter
public class AwsProperties {
    private final String accessKey;

    private final String secretKey;
}