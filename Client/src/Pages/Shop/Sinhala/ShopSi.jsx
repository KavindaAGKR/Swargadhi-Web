import React, { useState } from 'react';
import { Header } from '../../../Components/Header';
import { Footer } from '../../../Components/Footer';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box, Stack, Breadcrumbs, Typography } from '@mui/material';
import ProductCatalogSi from './ProductCatalogSi';
import { Link, useLocation } from 'react-router-dom';




export const ShopSi = (valuee) => {


    const location = useLocation();
    const categoryFromState = location.state?.category || 'all';

    const [value, setValue] = useState(categoryFromState);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const sinhalaState = () => {
        switch(value){
            case("all"): 
                return "සියලු නිෂ්පාදන" ;
            case("kalka"):
                return "කල්ක වර්ග";
            case('Thel'):
                return 'පත්තු වර්ග';
            case('Paththu'):
                return 'පත්තු වර්ග';
            case('Guli'):
                return 'ගුලි වර්ග';
            case('Chuurna'):
                return 'චූර්ණ වර්ග';
            case('Kashay'):
                return 'කෂාය වර්ග';

        }
    }

    return (
        <React.Fragment>
            <Header />
        <Breadcrumbs   Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:'15px'}}>
            <Typography color="#9A9A9A" component={Link} to="/" sx={{ textDecoration: 'none',fontSize:'13px' }}>
            මුල් පිටුව
            </Typography>
            <Typography color="#9A9A9A" component={Link} to="/user" sx={{ textDecoration: 'none',fontSize:'13px' }}>
            මිල දී ගන්න
            </Typography>
            <Typography color="#9A9A9A"  sx={{ textDecoration: 'none',fontSize:'13px' }}>
                {sinhalaState()}
            </Typography>

        </Breadcrumbs>
            
            <Stack sx={{ margin: 'auto',  display: 'flex', justifyContent: 'center', alignItems: 'center' , width:'95%'}}>
                <TabContext value={value} sx={{width:'90%', padding:'0px'}}>
                    <Box sx={{ margin: 'auto' }}>
                        <TabList
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            sx={{ width: { xs: '300px', sm: '500px', md: 'auto' } , padding:'0px'}}
                        >
                            <Tab label='සියලු නිෂ්පාදන' value='all' />
                            <Tab label='කල්ක වර්ග' value='kalka' />
                            <Tab label='තෙල් වර්ග' value='Thel' />
                            <Tab label='පත්තු වර්ග' value='Paththu' />
                            <Tab label='ගුලි වර්ග' value='Guli' />
                            <Tab label='චූර්ණ වර්ග' value='Chuurna'/>
                            <Tab label='කෂාය වර්ග' value='Kashay'  />
                        </TabList>
                    </Box>


                    
                    <TabPanel value='all' sx={{width:'100%', padding:'0px'}}>
                    <ProductCatalogSi category="all" />
                    </TabPanel>
                    <TabPanel value='kalka'sx={{width:'100%'}}>
                    <ProductCatalogSi category="කල්ක" />
                    </TabPanel>
                    <TabPanel value='Thel' sx={{width:'100%'}}>
                    <ProductCatalogSi category="තෙල්" />
                    </TabPanel>
                    <TabPanel value='Paththu' sx={{width:'100%'}}>
                    <ProductCatalogSi category="පත්තු" />
                    </TabPanel>
                    <TabPanel value='Guli' sx={{width:'100%'}}>
                    <ProductCatalogSi category="ගුලි" />
                    </TabPanel>
                    <TabPanel value='Chuurna' sx={{width:'100%'}}>
                    <ProductCatalogSi category="චූර්න" />
                    </TabPanel>
                    <TabPanel value='Kashay' sx={{width:'100%'}}>
                    <ProductCatalogSi category="කසාය" />
                    </TabPanel>
                
                </TabContext>
            </Stack>
            <Footer />
        </React.Fragment>
    );
};
