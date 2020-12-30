package com.pieszczek.wardrobe.helpers;

import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.model.Event;

import java.util.ArrayList;
import java.util.List;

public class EventHelper {

    private List<Event> responseEvent;

    public EventHelper(){
        Event event1 = new Event();
        event1.setId((long)5);
        event1.setName("zoo");

        Event event2 = new Event();
        event2.setId((long)6);
        event2.setName("work");

        this.responseEvent = new ArrayList<>();
        this.responseEvent.add(event1);
        this.responseEvent.add(event2);


    }
    public List<Event> getResponseEvent(){
        return this.responseEvent;
    }
    public Event getOneEvent(){
        return this.responseEvent.get(0);
    }

}
