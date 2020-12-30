package com.pieszczek.wardrobe.repositories;


import com.pieszczek.wardrobe.model.Cloth;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "clothes", path ="clothes")
public interface ClothesRepository extends Neo4jRepository<Cloth, Long> {

    @Query("MATCH (n:Person)-[:OWNS]->(c:Cloth) WHERE n.login = $login RETURN c")
    List<Cloth> getAllOwnsClothes(@Param("login") String login);

    @Query("MATCH (n:Person)-[:OWNS{part:$part}]->(c:Cloth) WHERE n.login = $login RETURN c")
    List<Cloth> getAllOwnsPartClothes(@Param("login") String login, @Param("part") String part);

    @Query("MATCH (n:Person),(c:Cloth) WHERE n.login = $login AND id(c) = $id CREATE (n)-[r:OWNS{part:$part}]->(c)")
    void connectWithOwner(@Param("login") String login, @Param("id") Long id, @Param("part") String part);

    @Query("MATCH (c:Cloth) WHERE id(c)=$id SET c.color=$color, c.material=$material")
    void updateCloth(@Param("id") Long id,@Param("color") String color, @Param("material") String material);

    @Query("MATCH (n:Cloth) WHERE (:Person{login:$login})-[:OWNS{part:'set'}]->(n)-[:HAS_STYLE]->(:Dresscode)-[:IS_APPROPRIATE_FOR]->(:Event{name:$event}) RETURN n")
    List<Cloth> findSetsForEvent(@Param("login")String login, @Param("event")String event);

    @Query("MATCH (n:Cloth) WHERE (:Person{login:$login})-[:OWNS{part:'top'}]->(n)-[:HAS_STYLE]->(:Dresscode)-[:IS_APPROPRIATE_FOR]->(:Event{name:$event}) RETURN n")
    List<Cloth> findTopsForEvent(@Param("login")String login, @Param("event")String event);

    @Query("MATCH (n:Cloth) WHERE (:Person{login:$login})-[:OWNS{part:'bottom'}]->(n)-[:HAS_STYLE]->(:Dresscode)-[:IS_APPROPRIATE_FOR]->(:Event{name:$event}) RETURN n")
    List<Cloth> findBottomsForEvent(@Param("login")String login, @Param("event")String event);

    @Query("MATCH (c:Cloth), (d:Dresscode) WHERE id(c) = $id AND d.name=$dresscode CREATE (c)-[:HAS_STYLE]->(d)")
    void connectWithDresscode(@Param("id") Long id, @Param("dresscode") String dresscode);
}
