package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.helpers.EventHelper;
import com.pieszczek.wardrobe.model.Event;
import com.pieszczek.wardrobe.repositories.EventRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class EventControllerIntegrationTests {
    private EventHelper eventHelper;
    private MockMvc mockMvc;

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventController eventController;

    @Before
    public void init(){
        eventHelper = new EventHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(eventController)
                .build();
    }
    @Test
    public void findAllShouldReturnEvents() throws Exception {
        List<Event> events = eventHelper.getResponseEvent();

        when(eventRepository.findAll()).thenReturn(events);

        mockMvc.perform(get("/app/events"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(events.get(0).getId()))
                .andExpect(jsonPath("$[0].name").value(events.get(0).getName()))
                .andExpect(jsonPath("$[1].id").value(events.get(1).getId()))
                .andExpect(jsonPath("$[1].name").value(events.get(1).getName()));
        verify(eventRepository,times(1)).findAll();
        verifyNoMoreInteractions(eventRepository);
    }
}
