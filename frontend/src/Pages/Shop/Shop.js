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
            
            <Stack sx={{ margin: 'auto', maxWidth: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TabContext value={value}>
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
                            <Tab label='Kashay' value='Kashay' />
                        </TabList>
                    </Box>

                    <TabPanel value='all'>
                    <ProductCatalog category="all" />
                    </TabPanel>
                    <TabPanel value='kalka'>
                    <ProductCatalog category="kalka" />
                    </TabPanel>
                    <TabPanel value='Thel'>
                    <ProductCatalog category="Thel" />
                    </TabPanel>
                    <TabPanel value='Paththu'>
                    <ProductCatalog category="Paththu" />
                    </TabPanel>
                    <TabPanel value='Guli'>
                    <ProductCatalog category="Guli" />
                    </TabPanel>
                    <TabPanel value='Chuurna'>
                    <ProductCatalog category="Chuurna" />
                    </TabPanel>
                    <TabPanel value='Kashay'>
                    <ProductCatalog category="Kashay" />
                    </TabPanel>
                </TabContext>
            </Stack>
            <Footer />
        </React.Fragment>
    );
};
export default Shop;