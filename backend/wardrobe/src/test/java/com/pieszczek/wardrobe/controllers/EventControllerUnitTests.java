package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.helpers.EventHelper;
import com.pieszczek.wardrobe.helpers.PersonHelper;
import com.pieszczek.wardrobe.model.Event;
import com.pieszczek.wardrobe.model.Person;
import com.pieszczek.wardrobe.repositories.ClothesRepository;
import com.pieszczek.wardrobe.repositories.EventRepository;
import com.pieszczek.wardrobe.repositories.PersonRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class EventControllerUnitTests {
    private EventHelper eventHelper;

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventController eventController;


    @Before
    public void init(){
        this.eventHelper = new EventHelper();
        MockitoAnnotations.initMocks(this);
    }
    @Test
    public void getAllEventsShouldReturnEVENTS() throws Exception {
        List<Event> events = eventHelper.getResponseEvent();
        when(eventRepository.findAll()).thenReturn(events);
        Iterable<Event> responseUser = eventController.findAll();
        Iterable<Event> expectedResponse = events;
        assertEquals(responseUser,expectedResponse);
    }
}
