package com.pieszczek.wardrobe.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

public class ClothesControllerIntegrationTests {
    private ClothHelper clothHelper;
    private PersonHelper personHelper;
    private DressCodeHelper dressCodeHelper;
    private EventHelper eventHelper;

    private MockMvc mockMvc;

    @Mock
    private PersonRepository personRepository;

    @Mock
    private ClothesRepository clothesRepository;

    @InjectMocks
    private ClothesController clothesController;

    @Before
    public void init(){
        personHelper = new PersonHelper();
        clothHelper = new ClothHelper();
        dressCodeHelper = new DressCodeHelper();
        eventHelper = new EventHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(clothesController)
                .build();
    }
    @Test
    public void findAllShouldReturnClothes() throws Exception {
        Person person = personHelper.getOnePerson();
        List<Cloth> clothes = clothHelper.getResponseClothes();

        when(clothesRepository.getAllOwnsClothes(any())).thenReturn(clothes);

        mockMvc.perform(get("/app/people/{login}/clothes", person.getLogin()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(clothes.get(0).getId()))
                .andExpect(jsonPath("$[0].category").value(clothes.get(0).getCategory()))
                .andExpect(jsonPath("$[0].color").value(clothes.get(0).getColor()))
                .andExpect(jsonPath("$[0].material").value(clothes.get(0).getMaterial()))
                .andExpect(jsonPath("$[1].id").value(clothes.get(1).getId()))
                .andExpect(jsonPath("$[1].category").value(clothes.get(1).getCategory()))
                .andExpect(jsonPath("$[1].color").value(clothes.get(1).getColor()))
                .andExpect(jsonPath("$[1].material").value(clothes.get(1).getMaterial()));

        verify(clothesRepository,times(1)).getAllOwnsClothes(any());
        verifyNoMoreInteractions(clothesRepository);
    }
    @Test
    public void deleteClothShouldReturnNOCONTENT() throws Exception {
        Person person = personHelper.getOnePerson();
        Cloth cloth = clothHelper.getOneCloth();

        mockMvc.perform(delete("/app/people/{login}/clothes/{id}", person.getLogin(),cloth.getId()))
                .andExpect(status().isNoContent());

        verify(clothesRepository,times(1)).deleteById(any());
        verifyNoMoreInteractions(clothesRepository);
    }
    @Test
    public void updateClothShouldReturnNOCONTENT() throws Exception {
        Person person = personHelper.getOnePerson();
        Cloth cloth = clothHelper.getOneCloth();

        mockMvc.perform(put("/app/people/{login}/clothes/{id}", person.getLogin(),cloth.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(cloth))
        )
                .andExpect(status().isOk());

        verify(clothesRepository,times(1)).updateCloth(any(),any(),any());
        verifyNoMoreInteractions(clothesRepository);
    }
    @Test
    public void connectClothShouldReturnOK() throws Exception {
        Person person = personHelper.getOnePerson();
        Cloth cloth = clothHelper.getOneCloth();
        DressCode dc = dressCodeHelper.getOneDressCode();

        mockMvc.perform(post("/app/people/{login}/clothes/{id}/dresscode", person.getLogin(),cloth.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(dc))
        )
                .andExpect(status().isOk());

        verify(clothesRepository,times(1)).connectWithDresscode(any(),any());
        verifyNoMoreInteractions(clothesRepository);
    }
    @Test
    public void createNewShouldReturnCREATED() throws Exception {
        Person person = personHelper.getOnePerson();
        Cloth cloth = clothHelper.getOneCloth();

        when(personRepository.findByLogin(any())).thenReturn(person);
        when(clothesRepository.save(any())).thenReturn(cloth);
        mockMvc.perform(post("/app/people/{login}/clothes/part/{part}", person.getLogin(),"top")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(cloth))
        )
                .andExpect(status().isCreated());


        verify(clothesRepository,times(1)).connectWithOwner(any(),any(),any());
        verify(clothesRepository,times(1)).save(any());
        verifyNoMoreInteractions(clothesRepository);
        verify(personRepository,times(1)).findByLogin(any());
        verifyNoMoreInteractions(personRepository);
    }
    @Test
    public void createNewShouldReturnNOTFOUND() throws Exception {
        Person person = personHelper.getOnePerson();
        Cloth cloth = clothHelper.getOneCloth();

        when(personRepository.findByLogin(any())).thenReturn(null);

        mockMvc.perform(post("/app/people/{login}/clothes/part/{part}", person.getLogin(),"top")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(cloth))
        )
                .andExpect(status().isNotFound());



        verify(personRepository,times(1)).findByLogin(any());
        verifyNoMoreInteractions(personRepository);
    }
    @Test
    public void getPartShouldReturnClothes() throws Exception {
        Person person = personHelper.getOnePerson();
        List<Cloth> clothes = clothHelper.getResponseClothes();

        when(clothesRepository.getAllOwnsPartClothes(any(),any())).thenReturn(clothes);

        mockMvc.perform(get("/app/people/{login}/clothes/part/{part}", person.getLogin(),"top")

        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(clothes.get(0).getId()))
                .andExpect(jsonPath("$[0].category").value(clothes.get(0).getCategory()))
                .andExpect(jsonPath("$[0].color").value(clothes.get(0).getColor()))
                .andExpect(jsonPath("$[0].material").value(clothes.get(0).getMaterial()))
                .andExpect(jsonPath("$[1].id").value(clothes.get(1).getId()))
                .andExpect(jsonPath("$[1].category").value(clothes.get(1).getCategory()))
                .andExpect(jsonPath("$[1].color").value(clothes.get(1).getColor()))
                .andExpect(jsonPath("$[1].material").value(clothes.get(1).getMaterial()));


        verify(clothesRepository,times(1)).getAllOwnsPartClothes(any(),any());
        verifyNoMoreInteractions(clothesRepository);
    }

    @Test
    public void getClothesForEventShouldReturnTopClothes() throws Exception {
        Person person = personHelper.getOnePerson();
        List<Cloth> clothes = clothHelper.getResponseClothes();
        Event event = eventHelper.getOneEvent();
        when(clothesRepository.findTopsForEvent(any(),any())).thenReturn(clothes);

        mockMvc.perform(post("/app/people/{login}/clothes/part/{part}/event", person.getLogin(),"top")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(event))
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(clothes.get(0).getId()))
                .andExpect(jsonPath("$[0].category").value(clothes.get(0).getCategory()))
                .andExpect(jsonPath("$[0].color").value(clothes.get(0).getColor()))
                .andExpect(jsonPath("$[0].material").value(clothes.get(0).getMaterial()))
                .andExpect(jsonPath("$[1].id").value(clothes.get(1).getId()))
                .andExpect(jsonPath("$[1].category").value(clothes.get(1).getCategory()))
                .andExpect(jsonPath("$[1].color").value(clothes.get(1).getColor()))
                .andExpect(jsonPath("$[1].material").value(clothes.get(1).getMaterial()));


        verify(clothesRepository,times(1)).findTopsForEvent(any(),any());
        verifyNoMoreInteractions(clothesRepository);
    }
    @Test
    public void getClothesForEventShouldReturnBottomClothes() throws Exception {
        Person person = personHelper.getOnePerson();
        List<Cloth> clothes = clothHelper.getResponseClothes();
        Event event = eventHelper.getOneEvent();
        when(clothesRepository.findBottomsForEvent(any(),any())).thenReturn(clothes);

        mockMvc.perform(post("/app/people/{login}/clothes/part/{part}/event", person.getLogin(),"bottom")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(event))
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(clothes.get(0).getId()))
                .andExpect(jsonPath("$[0].category").value(clothes.get(0).getCategory()))
                .andExpect(jsonPath("$[0].color").value(clothes.get(0).getColor()))
                .andExpect(jsonPath("$[0].material").value(clothes.get(0).getMaterial()))
                .andExpect(jsonPath("$[1].id").value(clothes.get(1).getId()))
                .andExpect(jsonPath("$[1].category").value(clothes.get(1).getCategory()))
                .andExpect(jsonPath("$[1].color").value(clothes.get(1).getColor()))
                .andExpect(jsonPath("$[1].material").value(clothes.get(1).getMaterial()));


        verify(clothesRepository,times(1)).findBottomsForEvent(any(),any());
        verifyNoMoreInteractions(clothesRepository);
    }
    @Test
    public void getClothesForEventShouldReturnSetClothes() throws Exception {
        Person person = personHelper.getOnePerson();
        List<Cloth> clothes = clothHelper.getResponseClothes();
        Event event = eventHelper.getOneEvent();
        when(clothesRepository.findSetsForEvent(any(),any())).thenReturn(clothes);

        mockMvc.perform(post("/app/people/{login}/clothes/part/{part}/event", person.getLogin(),"set")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(event))
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(clothes.get(0).getId()))
                .andExpect(jsonPath("$[0].category").value(clothes.get(0).getCategory()))
                .andExpect(jsonPath("$[0].color").value(clothes.get(0).getColor()))
                .andExpect(jsonPath("$[0].material").value(clothes.get(0).getMaterial()))
                .andExpect(jsonPath("$[1].id").value(clothes.get(1).getId()))
                .andExpect(jsonPath("$[1].category").value(clothes.get(1).getCategory()))
                .andExpect(jsonPath("$[1].color").value(clothes.get(1).getColor()))
                .andExpect(jsonPath("$[1].material").value(clothes.get(1).getMaterial()));


        verify(clothesRepository,times(1)).findSetsForEvent(any(),any());
        verifyNoMoreInteractions(clothesRepository);
    }

}
