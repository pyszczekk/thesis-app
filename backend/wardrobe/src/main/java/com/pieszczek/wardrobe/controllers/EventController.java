package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.model.Event;
import com.pieszczek.wardrobe.repositories.EventRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app/events")
public class EventController {
    private final EventRepository repository;

    public EventController(EventRepository repository) {
        this.repository = repository;
    }
    @GetMapping
    public Iterable<Event> findAll() {
        return repository.findAll();
    }
}
