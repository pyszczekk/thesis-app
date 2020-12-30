package com.pieszczek.wardrobe.controllers;

import com.pieszczek.wardrobe.helpers.ClothHelper;
import com.pieszczek.wardrobe.helpers.DressCodeHelper;
import com.pieszczek.wardrobe.helpers.PersonHelper;
import com.pieszczek.wardrobe.model.Cloth;
import com.pieszczek.wardrobe.model.DressCode;
import com.pieszczek.wardrobe.model.Person;
import com.pieszczek.wardrobe.repositories.DressCodeRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class DressCodeControllerUnitTests {
    private DressCodeHelper dressCodeHelper;
    private ClothHelper clothHelper;

    @Mock
    private DressCodeRepository dressCodeRepository;

    @InjectMocks
    private DressCodeController dressCodeController;

    @Before
    public void init(){
        this.dressCodeHelper = new DressCodeHelper();
        this.clothHelper = new ClothHelper();
        MockitoAnnotations.initMocks(this);
    }
    @Test
    public void getAllDresscodesShouldReturnDRESSCODES() throws Exception {
        List<DressCode> dresscodes = dressCodeHelper.getResponseDresscodes();
        when(dressCodeController.findAll()).thenReturn(dresscodes);
        Iterable<DressCode> responseUser = dressCodeController.findAll();
        Iterable<DressCode> expectedResponse = dresscodes;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getAllDressCodesNamesShouldReturnDRESSCODES() throws Exception {
        List<String> dresscodes = dressCodeHelper.getResponseDressCodesNames();
        when(dressCodeController.getDresscodeNames()).thenReturn(dresscodes);
        Iterable<String> responseUser = dressCodeController.getDresscodeNames();
        Iterable<String> expectedResponse = dresscodes;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getDresscodesForMaterialShouldReturnDRESSCODES() throws Exception {
        List<DressCode> dresscodes = dressCodeHelper.getResponseDresscodes();
        Cloth c = clothHelper.getOneCloth();
        when(dressCodeController.getDresscodesForMaterial(c.getMaterial())).thenReturn(dresscodes);
        Iterable<DressCode> responseUser = dressCodeController.getDresscodesForMaterial(c.getMaterial());
        Iterable<DressCode> expectedResponse = dresscodes;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getDresscodesForWomanCategoryShouldReturnDRESSCODES() throws Exception {
        List<DressCode> dresscodes = dressCodeHelper.getResponseDresscodes();
        Cloth c = clothHelper.getOneCloth();
        when(dressCodeController.getDresscodesForWomanCategory(c)).thenReturn(dresscodes);
        Iterable<DressCode> responseUser = dressCodeController.getDresscodesForWomanCategory(c);
        Iterable<DressCode> expectedResponse = dresscodes;
        assertEquals(responseUser,expectedResponse);
    }
    @Test
    public void getDresscodesForManCategoryShouldReturnDRESSCODES() throws Exception {
        List<DressCode> dresscodes = dressCodeHelper.getResponseDresscodes();
        Cloth c = clothHelper.getOneCloth();
        when(dressCodeController.getDresscodesForManCategory(c)).thenReturn(dresscodes);
        Iterable<DressCode> responseUser = dressCodeController.getDresscodesForManCategory(c);
        Iterable<DressCode> expectedResponse = dresscodes;
        assertEquals(responseUser,expectedResponse);
    }


}
