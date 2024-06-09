import React, { useState } from 'react';
import { Header } from '../../../Components/Header';
import { Footer } from '../../../Components/Footer';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box, Stack } from '@mui/material';
import ProductCatalogSi from './ProductCatalogSi';
import { useLocation } from 'react-router-dom';




export const ShopSi = (valuee) => {


    const location = useLocation();
    const categoryFromState = location.state?.category || 'all';

    const [value, setValue] = useState(categoryFromState);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <React.Fragment>
            <Header />
            
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
                            <Tab label='කල්ක වර්ග' value='කල්ක' />
                            <Tab label='තෙල් වර්ග' value='තෙල්' />
                            <Tab label='පත්තු වර්ග' value='පත්තු' />
                            <Tab label='ගුලි වර්ග' value='ගුලි' />
                            <Tab label='චූර්ණ වර්ග' value='චූර්න' />
                            <Tab label='කෂාය වර්ග' value='කසාය' />
                        </TabList>
                    </Box>


                    
                    <TabPanel value='all' sx={{width:'100%', padding:'0px'}}>
                    <ProductCatalogSi category="all" />
                    </TabPanel>
                    <TabPanel value='කල්ක' sx={{width:'100%'}}>
                    <ProductCatalogSi category="කල්ක" />
                    </TabPanel>
                    <TabPanel value='තෙල්' sx={{width:'100%'}}>
                    <ProductCatalogSi category="තෙල්" />
                    </TabPanel>
                    <TabPanel value='පත්තු' sx={{width:'100%'}}>
                    <ProductCatalogSi category="පත්තු" />
                    </TabPanel>
                    <TabPanel value='ගුලි' sx={{width:'100%'}}>
                    <ProductCatalogSi category="ගුලි" />
                    </TabPanel>
                    <TabPanel value='චූර්න' sx={{width:'100%'}}>
                    <ProductCatalogSi category="චූර්න" />
                    </TabPanel>
                    <TabPanel value='කසාය' sx={{width:'100%'}}>
                    <ProductCatalogSi category="කසාය" />
                    </TabPanel>
                
                </TabContext>
            </Stack>
            <Footer />
        </React.Fragment>
    );
};
