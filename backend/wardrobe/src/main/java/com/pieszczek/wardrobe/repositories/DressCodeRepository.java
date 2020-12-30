package com.pieszczek.wardrobe.repositories;

import com.pieszczek.wardrobe.model.DressCode;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource(collectionResourceRel = "dresscodes", path ="dresscodes")
public interface DressCodeRepository extends Neo4jRepository<DressCode, Long> {
    @Query("MATCH (dc:Dresscode) return dc.name")
    List<String> getDresscodeNames();
    @Query("MATCH (dc:Dresscode) WHERE $material IN dc.material return dc")
    List<DressCode> findByMaterial(@Param("material") String material);
    @Query("MATCH (dc:Dresscode) WHERE $category IN dc.woman return dc")
    List<DressCode> findByWomanClothes(@Param("category") String category);
    @Query("MATCH (dc:Dresscode) WHERE $category IN dc.man return dc")
    List<DressCode> findByManClothes(@Param("category") String category);

}
