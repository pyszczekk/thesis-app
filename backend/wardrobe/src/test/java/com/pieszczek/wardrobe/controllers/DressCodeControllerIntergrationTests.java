package com.pieszczek.wardrobe.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pieszczek.wardrobe.helpers.ClothHelper;
import com.pieszczek.wardrobe.helpers.DressCodeHelper;
import com.pieszczek.wardrobe.helpers.EventHelper;
import com.pieszczek.wardrobe.model.Cloth;
import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.model.Event;
import com.pieszczek.wardrobe.repositories.DressCodeRepository;
import com.pieszczek.wardrobe.repositories.EventRepository;
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

public class DressCodeControllerIntergrationTests {
    private DressCodeHelper dressCodeHelper;
    private ClothHelper clothHelper;
    private MockMvc mockMvc;

    @Mock
    private DressCodeRepository dressCodeRepository;

    @InjectMocks
    private DressCodeController dressCodeController;

    @Before
    public void init(){
        dressCodeHelper = new DressCodeHelper();
        clothHelper = new ClothHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(dressCodeController)
                .build();
    }
    @Test
    public void findAllShouldReturnDresscodes() throws Exception {
        List<DressCode> dressCodes = dressCodeHelper.getResponseDresscodes();

        when(dressCodeRepository.findAll()).thenReturn(dressCodes);

        mockMvc.perform(get("/app/dresscode"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(dressCodes.get(0).getId()))
                .andExpect(jsonPath("$[0].name").value(dressCodes.get(0).getName()))
                .andExpect(jsonPath("$[0].womanRules").isArray())
                .andExpect(jsonPath("$[0].manRules").isArray())
                .andExpect(jsonPath("$[0].material").isArray())
                .andExpect(jsonPath("$[1].id").value(dressCodes.get(1).getId()))
                .andExpect(jsonPath("$[1].name").value(dressCodes.get(1).getName()))
                .andExpect(jsonPath("$[1].womanRules").isArray())
                .andExpect(jsonPath("$[1].manRules").isArray())
                .andExpect(jsonPath("$[1].material").isArray());
        verify(dressCodeRepository,times(1)).findAll();
        verifyNoMoreInteractions(dressCodeRepository);
    }
    @Test
    public void getDressCodeNamesShouldReturnDresscodes() throws Exception {
        List<String> dressCodes = dressCodeHelper.getResponseDressCodesNames();

        when(dressCodeRepository.getDresscodeNames()).thenReturn(dressCodes);

        mockMvc.perform(get("/app/dresscode/name"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0]").value(dressCodes.get(0)))
                .andExpect(jsonPath("$[1]").value(dressCodes.get(1)));
        verify(dressCodeRepository,times(1)).getDresscodeNames();
        verifyNoMoreInteractions(dressCodeRepository);
    }
    @Test
    public void getDresscodesForMaterialShouldReturnDresscodes() throws Exception {
        List<DressCode> dressCodes = dressCodeHelper.getResponseDresscodes();

        when(dressCodeRepository.findByMaterial("silk")).thenReturn(dressCodes);

        mockMvc.perform(get("/app/dresscode/material/{material}","silk"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(dressCodes.get(0).getId()))
                .andExpect(jsonPath("$[0].name").value(dressCodes.get(0).getName()))
                .andExpect(jsonPath("$[0].womanRules").isArray())
                .andExpect(jsonPath("$[0].manRules").isArray())
                .andExpect(jsonPath("$[0].material").isArray())
                .andExpect(jsonPath("$[1].id").value(dressCodes.get(1).getId()))
                .andExpect(jsonPath("$[1].name").value(dressCodes.get(1).getName()))
                .andExpect(jsonPath("$[1].womanRules").isArray())
                .andExpect(jsonPath("$[1].manRules").isArray())
                .andExpect(jsonPath("$[1].material").isArray());
        verify(dressCodeRepository,times(1)).findByMaterial(any());
        verifyNoMoreInteractions(dressCodeRepository);
    }
    @Test
    public void getDresscodesForWomanCategoryShouldReturnDresscodes() throws Exception {
        List<DressCode> dressCodes = dressCodeHelper.getResponseDresscodes();
        Cloth cloth = clothHelper.getOneCloth();
        when(dressCodeRepository.findByWomanClothes(cloth.getCategory())).thenReturn(dressCodes);

        mockMvc.perform(post("/app/dresscode/woman")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(cloth))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(dressCodes.get(0).getId()))
                .andExpect(jsonPath("$[0].name").value(dressCodes.get(0).getName()))
                .andExpect(jsonPath("$[0].womanRules").isArray())
                .andExpect(jsonPath("$[0].manRules").isArray())
                .andExpect(jsonPath("$[0].material").isArray())
                .andExpect(jsonPath("$[1].id").value(dressCodes.get(1).getId()))
                .andExpect(jsonPath("$[1].name").value(dressCodes.get(1).getName()))
                .andExpect(jsonPath("$[1].womanRules").isArray())
                .andExpect(jsonPath("$[1].manRules").isArray())
                .andExpect(jsonPath("$[1].material").isArray());
        verify(dressCodeRepository,times(1)).findByWomanClothes(cloth.getCategory());
        verifyNoMoreInteractions(dressCodeRepository);
    }
    @Test
    public void getDresscodesForManCategoryShouldReturnDresscodes() throws Exception {
        List<DressCode> dressCodes = dressCodeHelper.getResponseDresscodes();
        Cloth cloth = clothHelper.getOneCloth();
        when(dressCodeRepository.findByManClothes(cloth.getCategory())).thenReturn(dressCodes);

        mockMvc.perform(post("/app/dresscode/man")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(cloth))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(dressCodes.get(0).getId()))
                .andExpect(jsonPath("$[0].name").value(dressCodes.get(0).getName()))
                .andExpect(jsonPath("$[0].womanRules").isArray())
                .andExpect(jsonPath("$[0].manRules").isArray())
                .andExpect(jsonPath("$[0].material").isArray())
                .andExpect(jsonPath("$[1].id").value(dressCodes.get(1).getId()))
                .andExpect(jsonPath("$[1].name").value(dressCodes.get(1).getName()))
                .andExpect(jsonPath("$[1].womanRules").isArray())
                .andExpect(jsonPath("$[1].manRules").isArray())
                .andExpect(jsonPath("$[1].material").isArray());
        verify(dressCodeRepository,times(1)).findByManClothes(cloth.getCategory());
        verifyNoMoreInteractions(dressCodeRepository);
    }
}
