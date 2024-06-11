import React, { useState } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box, Stack, Breadcrumbs, Typography } from '@mui/material';
import ProductCatalog from './ProductCatalog';
import { Link, useLocation, useNavigate } from 'react-router-dom';



export const Shop = (valuee) => {

    const navigate = useNavigate()
    const location = useLocation();
    const categoryFromState = location.state?.category || 'all';

    const [value, setValue] = useState(categoryFromState);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <React.Fragment>
            <Header />
            <Breadcrumbs aria-label="breadcrumb" separator="›" margin='0px' sx={{marginLeft:'15px'}}>
            <Link href='/' color="#9A9A9A" underline="none">Home</Link>
  <Typography color="#9A9A9A">Shop</Typography>
  <Typography color="#9A9A9A">{value}</Typography>
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
                            <Tab label='Kalka' value='kalka' />
                            <Tab label='Thel' value='Thel' />
                            <Tab label='Paththu' value='Paththu' />
                            <Tab label='Guli' value='Guli' />
                            <Tab label='Chuurna' value='Chuurna' />
                            <Tab label='Kashaya' value='Kashay' />
                        </TabList>
                    </Box>


                    
                    <TabPanel value='all' sx={{width:'100%', padding:'0px'}}>
                    <ProductCatalog category="all" />
                    </TabPanel>
                    <TabPanel value='kalka' sx={{width:'100%'}}>
                    <ProductCatalog category="kalka" />
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
                    <TabPanel value='Kashay' sx={{width:'100%'}}>
                    <ProductCatalog category="Kashaya" />
                    </TabPanel>
                
                </TabContext>
            </Stack>
            <Footer />
        </React.Fragment>
    );
};
