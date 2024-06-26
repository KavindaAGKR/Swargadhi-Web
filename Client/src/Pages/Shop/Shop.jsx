import React, { useState } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box, Stack, Breadcrumbs, Typography } from '@mui/material';
import ProductCatalog from './ProductCatalog';
import { Link, useLocation } from 'react-router-dom';



export const Shop = (valuee) => {


    const location = useLocation();
    const categoryFromState = location.state?.category || 'all';

    const [value, setValue] = useState(categoryFromState);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <React.Fragment>
            <Header />
            <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:'15px'}}>
            <Typography color="#9A9A9A" component={Link} to="/" sx={{ textDecoration: 'none',fontSize:'14px' }}>
                Home
            </Typography>
            <Typography color="#9A9A9A" component={Link} to="/shop" sx={{ textDecoration: 'none',fontSize:'14px' }}>
                Shop
            </Typography>
            <Typography color="#9A9A9A" sx={{ textDecoration: 'none',fontSize:'14px' }}>
                {value}
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
                            <Tab label='All Products' value='all' />
                            <Tab label='Kalka' value='Kalka' />
                            <Tab label='Thel' value='Thel' />
                            <Tab label='Paththu' value='Paththu' />
                            <Tab label='Guli' value='Guli' />
                            <Tab label='Chuurna' value='Chuurna' />
                            <Tab label='Kashaya' value='Kashaya' />
                        </TabList>
                    </Box>


                    
                    <TabPanel value='all' sx={{width:'100%', padding:'0px'}}>
                    <ProductCatalog category="all" />
                    </TabPanel>
                    <TabPanel value='Kalka' sx={{width:'100%'}}>
                    <ProductCatalog category="Kalka" />
                    </TabPanel>
                    <TabPanel value='Thel' sx={{width:'100%'}}>
                    <ProductCatalog category="Thel" />
                    </TabPanel>
                    <TabPanel value='Paththu' sx={{width:'100%'}}>
                    <ProductCatalog category="Paththu" />
                    </TabPanel>
                    <TabPanel value='Guli' sx={{width:'100%'}}>
                    <ProductCatalog category="Guli" />
                    </TabPanel>
                    <TabPanel value='Chuurna' sx={{width:'100%'}}>
                    <ProductCatalog category="Chuurna" />
                    </TabPanel>
                    <TabPanel value='Kashaya' sx={{width:'100%'}}>
                    <ProductCatalog category="Kashaya" />
                    </TabPanel>
                
                </TabContext>
            </Stack>
            <Footer />
        </React.Fragment>
    );
};
