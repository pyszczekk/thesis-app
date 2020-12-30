package com.pieszczek.wardrobe.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pieszczek.wardrobe.helpers.PersonHelper;
import com.pieszczek.wardrobe.model.Person;
import com.pieszczek.wardrobe.repositories.ClothesRepository;
import com.pieszczek.wardrobe.repositories.PersonRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

public class PeopleControllerIntegrationTests {
    private PersonHelper personHelper;
    private MockMvc mockMvc;

    @Mock
    private PersonRepository personRepository;
    @Mock
    private ClothesRepository clothesRepository;

    @InjectMocks
    private PeopleController peopleController;

    @Before
    public void init(){
        personHelper = new PersonHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(peopleController)
                .build();
    }
    @Test
    public void findAllShouldReturnPeople() throws Exception {
        List<Person> people = personHelper.getResponsePeople();

        when(personRepository.findAll()).thenReturn(people);

        mockMvc.perform(get("/app/people"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(people.get(0).getId()))
                .andExpect(jsonPath("$[0].name").value(people.get(0).getName()))
                .andExpect(jsonPath("$[0].gender").value(people.get(0).getGender()))
                .andExpect(jsonPath("$[0].password").value(people.get(0).getPassword()))
                .andExpect(jsonPath("$[0].login").value(people.get(0).getLogin()))
                .andExpect(jsonPath("$[1].id").value(people.get(1).getId()))
                .andExpect(jsonPath("$[1].name").value(people.get(1).getName()))
                .andExpect(jsonPath("$[1].gender").value(people.get(1).getGender()))
                .andExpect(jsonPath("$[1].password").value(people.get(1).getPassword()))
                .andExpect(jsonPath("$[1].login").value(people.get(1).getLogin()));
        verify(personRepository,times(1)).findAll();
        verifyNoMoreInteractions(personRepository);
    }

    @Test
    public void createNewShouldReturnCONFLICT() throws Exception {
        Person person = personHelper.getOnePerson();

        when(personRepository.findByLogin(person.getLogin())).thenReturn(person);

        mockMvc.perform(post("/app/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(person))
        )
                .andExpect(status().isConflict())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(personRepository,times(1)).findByLogin(person.getLogin());
        verifyNoMoreInteractions(personRepository);
    }
    @Test
    public void createNewShouldReturnCREATED() throws Exception {
        Person person = personHelper.getOnePerson();

        when(personRepository.findByLogin(any())).thenReturn(null);
        when(personRepository.save(any())).thenReturn(person);

        mockMvc.perform(post("/app/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(person))
        )
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(personRepository,times(1)).findByLogin(any());
        verify(personRepository,times(1)).save(any());

        verifyNoMoreInteractions(personRepository);
    }
    @Test
    public void loginShouldReturnOK() throws Exception {
        Person person = personHelper.getOnePerson();

        when(personRepository.login(person.getLogin(), person.getPassword())).thenReturn(person);

        mockMvc.perform(post("/app/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(person))
        )
                .andExpect(status().isOk());

        verify(personRepository,times(1)).login(person.getLogin(),person.getPassword());
        verifyNoMoreInteractions(personRepository);
    }
    @Test
    public void loginShouldReturnNOTFOUND() throws Exception {
        Person person = personHelper.getOnePerson();

        when(personRepository.login(person.getLogin(), person.getPassword())).thenReturn(null);

        mockMvc.perform(post("/app/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(person))
        )
                .andExpect(status().isNotFound());

        verify(personRepository,times(1)).login(person.getLogin(),person.getPassword());
        verifyNoMoreInteractions(personRepository);
    }
    @Test
    public void updateByLoginShouldReturnPerson() throws Exception {
        Person person = personHelper.getOnePerson();

        when(personRepository.findByLogin(any())).thenReturn(person);
        when(personRepository.updatePerson(person.getLogin(),person.getName(),person.getPassword())).thenReturn(person);


        mockMvc.perform(put("/app/people/{login}", "test")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(person))
        )
                .andExpect(status().isOk());

        verify(personRepository,times(1)).findByLogin(any());
        verify(personRepository,times(1)).updatePerson(any(),any(),any());
        verifyNoMoreInteractions(personRepository);
    }
    @Test
    public void deleteByLoginShouldReturnNOCONTENT() throws Exception {
        Person person = personHelper.getOnePerson();

        when(personRepository.findByLogin(any())).thenReturn(person);

        mockMvc.perform(delete("/app/people/{login}", "test")
        )
                .andExpect(status().isNoContent());

        verify(clothesRepository,times(1)).getAllOwnsClothes(any());
        verify(clothesRepository,times(1)).deleteAll(any());

        verify(personRepository,times(1)).findByLogin(any());
        verify(personRepository,times(1)).deleteById(any());

        verifyNoMoreInteractions(personRepository);
    }
    @Test
    public void findByLoginShouldReturnPerson() throws Exception {
        Person person = personHelper.getOnePerson();

        when(personRepository.findByLogin(any())).thenReturn(person);

        mockMvc.perform(get("/app/people/{login}", person.getLogin())

        )
                .andExpect(status().isOk());

        verify(personRepository,times(1)).findByLogin(any());
        verifyNoMoreInteractions(personRepository);
    }

}
