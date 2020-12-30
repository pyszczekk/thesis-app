package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.helpers.ClothHelper;
import com.pieszczek.wardrobe.helpers.DressCodeHelper;
import com.pieszczek.wardrobe.helpers.EventHelper;
import com.pieszczek.wardrobe.helpers.PersonHelper;
import com.pieszczek.wardrobe.model.Cloth;
import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.model.Event;
import com.pieszczek.wardrobe.model.Person;
import com.pieszczek.wardrobe.repositories.ClothesRepository;
import com.pieszczek.wardrobe.repositories.PersonRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class ClothesControllerUnitTests {
    private ClothHelper clothHelper;
    private PersonHelper personHelper;
    private DressCodeHelper dressCodeHelper;
    private EventHelper eventHelper;

    @Mock
    private PersonRepository personRepository;

    @Mock
    private ClothesRepository clothesRepository;

    @InjectMocks
    private ClothesController clothesController;

    @Before
    public void init(){
        this.personHelper = new PersonHelper();
        this.clothHelper = new ClothHelper();
        this.dressCodeHelper = new DressCodeHelper();
        this.eventHelper = new EventHelper();
        MockitoAnnotations.initMocks(this);
    }
    @Test
    public void getAllClothesShouldReturnCLOTHES() throws Exception {
        List<Cloth> clothes = clothHelper.getResponseClothes();
        Person user = personHelper.getOnePerson();
        when(clothesRepository.getAllOwnsClothes(user.getLogin())).thenReturn(clothes);
        Iterable<Cloth> responseUser = clothesController.getAllClothes(user.getLogin());
        Iterable<Cloth> expectedResponse = clothes;
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void deleteClothShouldReturnNOCONTENT() throws Exception {
        Cloth cloth = clothHelper.getOneCloth();

        ResponseEntity<String> responseUser = clothesController.deleteCloth(cloth.getId());
        ResponseEntity<String> expectedResponse = new ResponseEntity<>("Deleted", HttpStatus.NO_CONTENT);
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void updateClothShouldReturnOK() throws Exception {
        Cloth cloth = clothHelper.getOneCloth();
        DressCode dc = dressCodeHelper.getOneDressCode();
        ResponseEntity<String> responseUser = clothesController.updateCloth(cloth);
        ResponseEntity<String> expectedResponse = new ResponseEntity<>("updated", HttpStatus.OK);
        assertEquals(responseUser,expectedResponse);
    }

    @Test
    public void connectClothShouldReturnOK() throws Exception {
        Cloth cloth = clothHelper.getOneCloth();
        DressCode dc = dressCodeHelper.getOneDressCode();
        ResponseEntity<String> responseUser = clothesController.connectCloth(cloth.getId(), dc);
        ResponseEntity<String> expectedResponse = new ResponseEntity<>("updated", HttpStatus.OK);
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getPartsShouldReturnCLOTHES() throws Exception {
        List<Cloth> clothes = clothHelper.getResponseClothes();
        Person user = personHelper.getOnePerson();
        when(clothesRepository.getAllOwnsPartClothes(user.getLogin(),"top")).thenReturn(clothes);
        Iterable<Cloth> responseUser = clothesController.getParts(user.getLogin(),"top");
        Iterable<Cloth> expectedResponse = clothes;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void createNewShouldReturnCREATED() throws Exception {
        Cloth cloth = clothHelper.getOneCloth();
        Person user = personHelper.getOnePerson();
        when(personRepository.findByLogin(user.getLogin())).thenReturn(user);
        when(clothesRepository.save(cloth)).thenReturn(cloth);
        ResponseEntity<String> responseUser = clothesController.createNew(user.getLogin(),cloth,"top");
        ResponseEntity<String> expectedResponse = new ResponseEntity<>(""+cloth.getId(), HttpStatus.CREATED);
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void createNewShouldReturnNOTFOUND() throws Exception {
        Cloth cloth = clothHelper.getOneCloth();
        Person user = personHelper.getOnePerson();
        when(personRepository.findByLogin(user.getLogin())).thenReturn(null);

        ResponseEntity<String> responseUser = clothesController.createNew(user.getLogin(),cloth,"top");
        ResponseEntity<String> expectedResponse = new ResponseEntity<>("Person not found", HttpStatus.NOT_FOUND);
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getClothesForEventShouldReturnNULL() throws Exception {

        Person user = personHelper.getOnePerson();
        Event event = eventHelper.getOneEvent();
        Iterable<Cloth> responseUser = clothesController.getClothesForEvent(user.getLogin(),event, "sdfgh");
        Iterable<Cloth> expectedResponse = null;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getClothesForEventShouldReturnTopCLOTHES() throws Exception {
        List<Cloth> clothes = clothHelper.getResponseClothes();
        Person user = personHelper.getOnePerson();
        Event event = eventHelper.getOneEvent();
        when(clothesRepository.findTopsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);
        when(clothesRepository.findBottomsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);
        when(clothesRepository.findSetsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);

        Iterable<Cloth> responseUser = clothesController.getClothesForEvent(user.getLogin(),event, "top");
        Iterable<Cloth> expectedResponse = clothes;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getClothesForEventShouldReturnBottomCLOTHES() throws Exception {
        List<Cloth> clothes = clothHelper.getResponseClothes();
        Person user = personHelper.getOnePerson();
        Event event = eventHelper.getOneEvent();
        when(clothesRepository.findTopsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);
        when(clothesRepository.findBottomsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);
        when(clothesRepository.findSetsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);

        Iterable<Cloth> responseUser = clothesController.getClothesForEvent(user.getLogin(),event, "bottom");
        Iterable<Cloth> expectedResponse = clothes;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getClothesForEventShouldReturnSetCLOTHES() throws Exception {
        List<Cloth> clothes = clothHelper.getResponseClothes();
        Person user = personHelper.getOnePerson();
        Event event = eventHelper.getOneEvent();
        when(clothesRepository.findTopsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);
        when(clothesRepository.findBottomsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);
        when(clothesRepository.findSetsForEvent(user.getLogin(),event.getName())).thenReturn(clothes);

        Iterable<Cloth> responseUser = clothesController.getClothesForEvent(user.getLogin(),event, "set");
        Iterable<Cloth> expectedResponse = clothes;
        assertEquals(responseUser,expectedResponse);
    }

}
