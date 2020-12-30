package com.pieszczek.wardrobe.helpers;

import com.pieszczek.wardrobe.model.Cloth;
import com.pieszczek.wardrobe.model.DressCode;

import java.util.ArrayList;
import java.util.List;

public class DressCodeHelper {

    private List<DressCode> responseDresscodes;

    public DressCodeHelper(){
        DressCode dc1 = new DressCode();
        dc1.setId((long)3);
        dc1.setName("casual");
        String[] manRules = {"shirt","trousers"};
        dc1.setManRules(manRules);
        String[] womanRules = {"skirt", "dress"};
        dc1.setWomanRules(womanRules);
        String[] materials = {"silk","cotton"};
        dc1.setMaterial(materials);

        DressCode dc2 = new DressCode();
        dc2.setId((long)4);
        dc2.setName("smart casual");
        dc2.setManRules(manRules);
        dc2.setWomanRules(womanRules);
        dc2.setMaterial(materials);

        this.responseDresscodes = new ArrayList<>();
        this.responseDresscodes.add(dc1);
        this.responseDresscodes.add(dc2);


    }
    public List<DressCode> getResponseDresscodes(){
        return this.responseDresscodes;
    }
    public DressCode getOneDressCode(){
        return this.responseDresscodes.get(0);
    }
    public List<String> getResponseDressCodesNames(){
        ArrayList<String> names = new ArrayList<>();
        for (DressCode dc: this.responseDresscodes
             ) {
            names.add(dc.getName());
        }
        return names;
    }
}
