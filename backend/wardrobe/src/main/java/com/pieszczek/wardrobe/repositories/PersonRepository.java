package com.pieszczek.wardrobe.repositories;

import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.model.Person;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
@Repository
public interface PersonRepository extends Neo4jRepository<Person, Long> {
   Person findByLogin(@Param("login") String login);

   @Query("MATCH (p:Person) WHERE p.login = $login AND p.password = $password return p")
   Person login(String login, String password);

   @Query("MATCH (c:Person) WHERE c.login=$login SET c.name=$name, c.password=$password")
   Person updatePerson(String login, String name, String password);
}
