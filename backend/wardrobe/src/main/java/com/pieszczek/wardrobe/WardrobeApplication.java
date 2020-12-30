package com.pieszczek.wardrobe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@SpringBootApplication
@EnableTransactionManagement
@EnableNeo4jRepositories(basePackages="com.pieszczek.wardrobe.repositories")
public class WardrobeApplication {

	public static void main(String[] args) {
		SpringApplication.run(WardrobeApplication.class, args);
	}

}
