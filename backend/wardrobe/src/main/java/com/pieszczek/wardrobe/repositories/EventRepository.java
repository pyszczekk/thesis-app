package com.pieszczek.wardrobe.repositories;

import com.pieszczek.wardrobe.model.Event;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "events", path ="events")
public interface EventRepository extends Neo4jRepository<Event, Long> {
    List<Event> findByName(@Param("name") String name);
}
