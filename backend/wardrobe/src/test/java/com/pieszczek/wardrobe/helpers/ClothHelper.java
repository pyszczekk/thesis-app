package com.pieszczek.wardrobe.helpers;

import com.pieszczek.wardrobe.model.Cloth;

import java.util.ArrayList;
import java.util.List;

public class ClothHelper {
    private List<Cloth> responseClothes;

    public ClothHelper(){
        Cloth cloth1 = new Cloth();
        cloth1.setId((long) 1);
        cloth1.setCategory("pencil_skirt");
        cloth1.setColor("#def");
        cloth1.setMaterial("silk");

        Cloth cloth2 = new Cloth();
        cloth2.setId((long)2);
        cloth2.setCategory("bubble_dress");
        cloth2.setColor("#fff000");

        this.responseClothes = new ArrayList<>();
        this.responseClothes.add(cloth1);
        this.responseClothes.add(cloth2);
    }
    public List<Cloth> getResponseClothes(){
        return this.responseClothes;
    }
    public Cloth getOneCloth(){
        return this.responseClothes.get(0);
    }
}
