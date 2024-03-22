import React, { useState } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import {TabContext, TabList, TabPanel, } from '@mui/lab'
import { Tab, Box, Stack } from '@mui/material'


export const Shop = () => {


  //To navigate Tab panel
  const [value, setValue] = useState('1')
  const handleChange = (event, Value) => {
    setValue(Value);
  }
  



  return (
    <React.Fragment><Header/>
      
      <Stack sx={{margin:'auto', justifyContent:'center'}} >
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label='All Products' value='1' />
            <Tab label='Kalka' value='2'/>
            <Tab label='Thel' value='3'/>
            <Tab label='Paththu' value='4'/>
            <Tab label='Guli' value='5'/>
            <Tab label='Chuurna' value='6'/>
            <Tab label='Kashaya' value='7'/>
          </TabList>
        </Box>


        <TabPanel value='1'>All Products</TabPanel>
        <TabPanel value='2'>Kalka</TabPanel>
        <TabPanel value='3'>Thel</TabPanel>
        <TabPanel value='4'>Paththu</TabPanel>
        <TabPanel value='5'>Guli</TabPanel>
        <TabPanel value='6'>Chuurna</TabPanel>
        <TabPanel value='7'>kashaya</TabPanel>



      </TabContext>
      </Stack>



      
      <Footer/></React.Fragment>
  )
}
