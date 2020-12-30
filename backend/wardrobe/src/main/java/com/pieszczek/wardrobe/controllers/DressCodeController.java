package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.model.Cloth;
import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.repositories.DressCodeRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app/dresscode")
public class DressCodeController {
    private final DressCodeRepository repository;

    public DressCodeController(DressCodeRepository repository) {
        this.repository = repository;
    }
    @GetMapping
    public Iterable<DressCode> findAll() {
        return repository.findAll();
    }

    @GetMapping("/name")
    public Iterable<String> getDresscodeNames(){
        return repository.getDresscodeNames();
    }

    @GetMapping("/material/{material}")
    public Iterable<DressCode> getDresscodesForMaterial(@PathVariable("material") String material ){
        return repository.findByMaterial(material);
    }
    @PostMapping("/woman")
    public  Iterable<DressCode> getDresscodesForWomanCategory(@RequestBody Cloth cloth){
        return repository.findByWomanClothes(cloth.getCategory());
    }
    @PostMapping("/man")
    public  Iterable<DressCode> getDresscodesForManCategory(@RequestBody Cloth cloth){
        return repository.findByManClothes(cloth.getCategory());
    }
}
