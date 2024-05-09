import React from 'react'
import {  Button, Container, Stack } from '@mui/material'
//import { useNavigate } from 'react-router-dom'

import { HomeText } from '../../Components/Home/HomeText'

import slider1 from '../../Images/Slider1.jpg'
import slider2 from '../../Images/Slider2.png'
import slider3 from '../../Images/Slider3.png'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { BestSales, HomeSwiper } from './BestSales'




export const Home = () => {
    //const navigate = useNavigate()


    //Images For Image Slider
    const images = [
      {key: 6,images:slider1},
      {key: 2,images:slider2},
      {key: 1,images:slider3}
          
    ];




          
  return (
    <React.Fragment>
        <Header/>
        <Stack >
        <Stack width='50%' margin='50px auto '>
          <HomeSwiper imageArray={images}  />

        </Stack>
        <HomeText/>

        <Button sx={{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    width:'150px',
    borderRadius: '3px',
    height: '48px',
    margin:'auto',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white', // Set text color to white
  }}> 
          Shop Now
        </Button>
        <Container >
          <BestSales fetchData={true}  />
        </Container>
        </Stack>
        <Footer/>
    </React.Fragment>
  )
}
