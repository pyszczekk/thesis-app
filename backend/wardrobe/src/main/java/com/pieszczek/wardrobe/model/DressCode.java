package com.pieszczek.wardrobe.model;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;

@NodeEntity(label="Dresscode")
public class DressCode {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String[] man;
    private String[] woman;
    private String[] material;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getManRules() {
        return man;
    }

    public void setManRules(String[] man) {
        this.man = man;
    }

    public String[] getWomanRules() {
        return woman;
    }

    public void setWomanRules(String[] woman) {
        this.woman = woman;
    }

    public String[] getMaterial() {
        return material;
    }

    public void setMaterial(String[] material) {
        this.material = material;
    }
}
