package site.sleepmate.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import site.sleepmate.backend.properties.AwsProperties;
import site.sleepmate.backend.properties.AwsS3Properties;

@SpringBootApplication
@EnableConfigurationProperties({
		AwsProperties.class,
		AwsS3Properties.class
})
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}