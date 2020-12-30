package com.pieszczek.wardrobe.helpers;

import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.model.Person;

import java.util.ArrayList;
import java.util.List;

public class PersonHelper {

    private List<Person> responsePeople;

    public PersonHelper(){
        Person user1 = new Person();
        user1.setId((long)7);
        user1.setGender("f");
        user1.setLogin("user1");
        user1.setPassword("user1");
        user1.setName("User 1");

        Person user2 = new Person();
        user2.setId((long)8);
        user2.setGender("m");
        user2.setLogin("user2");
        user2.setPassword("user2");
        user2.setName("User 2");

        this.responsePeople = new ArrayList<>();
        this.responsePeople.add(user1);
        this.responsePeople.add(user2);


    }
    public List<Person> getResponsePeople(){
        return this.responsePeople;
    }
    public Person getOnePerson(){
        return this.responsePeople.get(0);
    }

}
