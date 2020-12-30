package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.model.Cloth;
import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.model.Event;
import com.pieszczek.wardrobe.model.Person;
import com.pieszczek.wardrobe.repositories.ClothesRepository;
import com.pieszczek.wardrobe.repositories.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/app/people/{login}/clothes")
public class ClothesController {
    private final ClothesRepository repository;
    private final PersonRepository peopleRepository;

    public ClothesController(ClothesRepository repository, PersonRepository peopleRepository) {
        this.repository = repository;
        this.peopleRepository = peopleRepository;
    }
    @GetMapping
    public Iterable<Cloth> getAllClothes(@PathVariable String login) {
        return repository.getAllOwnsClothes(login);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCloth(@PathVariable Long id){
        repository.deleteById(id);

        return new ResponseEntity<>("Deleted", HttpStatus.NO_CONTENT);
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCloth(@RequestBody Cloth cloth){
        repository.updateCloth(cloth.getId(),cloth.getColor(),cloth.getMaterial());
        return new ResponseEntity<>("updated", HttpStatus.OK);
    }
    @PostMapping("/{id}/dresscode")
    public ResponseEntity<String> connectCloth(@PathVariable("id") Long id, @RequestBody DressCode dresscode){
        repository.connectWithDresscode(id,dresscode.getName());
        return new ResponseEntity<>("updated", HttpStatus.OK);
    }

    @PostMapping("/part/{part}")
    public ResponseEntity<String> createNew(@PathVariable("login") String login, @RequestBody Cloth cloth, @PathVariable("part") String part ){
        Person persistedPerson = peopleRepository.findByLogin(login);
        if(persistedPerson!=null){
            Cloth saved = repository.save(cloth);
            repository.connectWithOwner(login, saved.getId(),part);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(""+cloth.getId()); // id of created cloth
        }
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Person not found");
    }

    @GetMapping("/part/{part}")
    public Iterable<Cloth> getParts(@PathVariable("login") String login, @PathVariable("part") String part){
        return repository.getAllOwnsPartClothes(login,part);
    }
    @PostMapping("/part/{part}/event")
    public Iterable<Cloth> getClothesForEvent(@PathVariable("login") String login, @RequestBody Event event, @PathVariable("part") String part){
      if(part.equals("top"))
              return repository.findTopsForEvent(login,event.getName());
        if(part.equals("bottom"))
              return repository.findBottomsForEvent(login,event.getName());

        if(part.equals("set"))
              return repository.findSetsForEvent(login,event.getName());

        return null;

    }


}
