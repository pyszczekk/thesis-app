package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.model.Person;
import com.pieszczek.wardrobe.repositories.ClothesRepository;
import com.pieszczek.wardrobe.repositories.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


@RestController
@RequestMapping("/app")
public class PeopleController {
    private final PersonRepository repository;
    private final ClothesRepository clothesRepository;
    public PeopleController(PersonRepository repository, ClothesRepository clothesRepository) {
        this.repository = repository;
        this.clothesRepository = clothesRepository;
    }
    @GetMapping("/people")
    public Iterable<Person> findAll() {
        return repository.findAll();
    }
    @PostMapping("/register")
    public ResponseEntity<Person> createNew(@RequestBody Person person ){
        Person persistedPerson = repository.findByLogin(person.getLogin());
        if(persistedPerson!=null){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(person);
        }
                persistedPerson = repository.save(person);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(person);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Person log){
        Person tryLogin = repository.login(log.getLogin(), log.getPassword());
        if(tryLogin!=null)
            return new ResponseEntity<>("Logged", HttpStatus.OK);
        else return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
    }
    @PutMapping("/people/{login}")
    public Person updateByLogin(@PathVariable String login, @RequestBody Person updated ){
        repository.updatePerson(login, updated.getName(), updated.getPassword());
        Person updatedNode = repository.findByLogin(login);
        return updatedNode;
    }
    @DeleteMapping("/people/{login}")
    public ResponseEntity<String> deleteByLogin(@PathVariable String login){

        clothesRepository.deleteAll(clothesRepository.getAllOwnsClothes(login));
        repository.deleteById(repository.findByLogin(login).getId());

        return new ResponseEntity<>("Deleted", HttpStatus.NO_CONTENT);
    }
    @GetMapping("/people/{login}")
    public Person findByLogin(@PathVariable String login){
     return repository.findByLogin(login);
    }


}
