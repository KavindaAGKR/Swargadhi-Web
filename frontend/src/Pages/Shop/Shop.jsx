import React, { useState } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box, Stack } from '@mui/material';
import ProductCatalog from './ProductCatalog';



 const Shop = () => {

   

    const [value, setValue] = useState('all');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Header />
            
            <Stack sx={{ margin: '25px auto', maxWidth: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TabContext value={value} sx={{width:'100%'}}>
                    <Box sx={{ margin: 'auto' }}>
                        <TabList
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            sx={{ width: { xs: '300px', sm: '500px', md: 'auto' } }}
                        >
                            <Tab label='All Products' value='all' />
                            <Tab label='kalka' value='kalka' />
                            <Tab label='Thel' value='Thel' />
                            <Tab label='Paththu' value='Paththu' />
                            <Tab label='Guli' value='Guli' />
                            <Tab label='Chuurna' value='Chuurna' />
                            <Tab label='Kashaya' value='Kashay' />
                        </TabList>
                    </Box>


                    
                    <TabPanel value='all' sx={{width:'100%'}}>
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
export default Shop;