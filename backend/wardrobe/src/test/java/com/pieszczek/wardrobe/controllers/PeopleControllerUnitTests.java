package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.helpers.PersonHelper;
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

public class PeopleControllerUnitTests {
    private PersonHelper personHelper;

    @Mock
    private PersonRepository personRepository;

    @InjectMocks
    private PeopleController peopleController;

    @Mock
    private ClothesRepository clothesRepository;

    @Before
    public void init(){
        this.personHelper = new PersonHelper();
        MockitoAnnotations.initMocks(this);
    }
    @Test
    public void getAllPeopleShouldReturnPERSON() throws Exception {
        List<Person> user = personHelper.getResponsePeople();
        when(personRepository.findAll()).thenReturn(user);
        Iterable<Person> responseUser = peopleController.findAll();
        Iterable<Person> expectedResponse = user;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void registerShouldReturnCONFLICT() throws Exception {
        Person user = personHelper.getOnePerson();
        when(personRepository.findByLogin(user.getLogin())).thenReturn(user);
        ResponseEntity<Person> responseUser = peopleController.createNew(user);
        ResponseEntity<Person> expectedResponse = new ResponseEntity<>(user, HttpStatus.CONFLICT);
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void registerShouldReturnCREATED() throws Exception {
        Person user = personHelper.getOnePerson();
        when(personRepository.findByLogin(user.getLogin())).thenReturn(null);
        ResponseEntity<Person> responseUser = peopleController.createNew(user);
        ResponseEntity<Person> expectedResponse = new ResponseEntity<>(user, HttpStatus.CREATED);
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void loginShouldReturnOK() throws Exception {
        Person user = personHelper.getOnePerson();
        when(personRepository.login(user.getLogin(), user.getPassword())).thenReturn(user);
        ResponseEntity<String> responseUser = peopleController.login(user);
        ResponseEntity<String> expectedResponse = new ResponseEntity<String>("Logged", HttpStatus.OK);
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void loginShouldReturnNOTFOUND() throws Exception {
        Person user = personHelper.getOnePerson();
        when(personRepository.login(user.getLogin(), user.getPassword())).thenReturn(null);
        ResponseEntity<String> responseUser = peopleController.login(user);
        ResponseEntity<String> expectedResponse = new ResponseEntity<String>("Not found", HttpStatus.NOT_FOUND);
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void updateByLoginShouldReturnPERSON() throws Exception {
        Person user = personHelper.getOnePerson();
        when(personRepository.findByLogin(user.getLogin())).thenReturn(user);
        when(personRepository.updatePerson(user.getLogin(),user.getName(),user.getPassword())).thenReturn(null);
        Person responseUser = peopleController.updateByLogin(user.getLogin(),user);
        Person expectedResponse = user;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void deleteByLoginShouldReturnNOCONTENT() throws Exception {
        Person user = personHelper.getOnePerson();
        when(personRepository.findByLogin(user.getLogin())).thenReturn(user);
        ResponseEntity<String> responseUser = peopleController.deleteByLogin(user.getLogin());
        ResponseEntity<String> expectedResponse = new ResponseEntity<String>("Deleted", HttpStatus.NO_CONTENT);
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void findByLoginShouldReturnPERSON() throws Exception {
        Person user = personHelper.getOnePerson();
        when(personRepository.findByLogin(user.getLogin())).thenReturn(user);
        Person responseUser = peopleController.findByLogin(user.getLogin());
        Person expectedResponse = user;
        assertEquals(responseUser,expectedResponse);
    }








}
