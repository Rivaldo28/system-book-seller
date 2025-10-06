package com.crescendo.digital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@SpringBootApplication
@PropertySource("classpath:application-${spring.profiles.active:default}.properties")
@EnableTransactionManagement // Habilita o gerenciamento de transações do Spring
public class SpringBootBookSellerApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(SpringBootBookSellerApplication.class, args);
	}


}
