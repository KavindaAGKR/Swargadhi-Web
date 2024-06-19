import React from 'react';
import slide from '../../Images/category/Edited-68.jpg';
import { Box, Container, Grid, List, Stack, Typography } from '@mui/material';
import { MotionButton } from '../../Components/FramerMotion/MotionButton';
import { useNavigate } from 'react-router-dom';

import slide1 from '../../Images/category/chuurna.jpg'
import slide2 from '../../Images/category/Guli.jpg'
import slide3 from '../../Images/category/pottani.jpg'
import slide4 from '../../Images/category/thel.jpg'
import slide5 from '../../Images/category/Edited-141-300x300.jpg'
import { Padding } from '@mui/icons-material';


const categories = [
  {
    nameEn: "kalka",
    nameSi:'කල්ක',
    image: slide5,
  },
  {
    nameEn: "Thel",
    nameSi:'තෙල්',
    image: slide4,
  },
  {
    nameEn: "Paththu",
    nameSi:'පත්තු',
    image: slide,
  },
  {
    nameEn: "Guli",
    nameSi:'ගුලි',
    image: slide2,
  },
  {
    nameEn: "Chuurna",
    nameSi:'චූර්ණ',
    image: slide1,
  },
  {
    nameEn: "Kashay",
    nameSi:'කෂාය',
    image: slide3,
  },
];

export const ShopByCategory = ({isSinhalaTrue}) => {
    const navigate = useNavigate();
    
    if(isSinhalaTrue){
      return (
        <>
        <Typography variant='h5' margin='25px auto' width='90%'>වර්ගය අනුව බෙහෙත් මිල දී ගන්න</Typography>
        <Grid container gap={3}  sx={{alignSelf:'center', justifyContent:'center', alignItems:'center', margin:'auto'}}>
          {categories.map((cat, index) => (
            
              <Grid>
              <MotionButton key={index} stylee={{Padding:'auto', margin:'auto', alignSelf:'center', }} onClick={()=> navigate('/shop', { state: { category: cat.nameEn } })}>
              
              <Stack>
              <img style={{width:'150px', height:'150px', border:'solid 2px black', borderRadius:'15px'}} src={cat.image} alt={cat.nameSi} />
              <Typography variant='h6' textAlign='center' color='black'>{cat.nameSi}</Typography>
              </Stack>
            </MotionButton>
            </Grid>
            
            
          ))}
        </Grid>
        </>
      );
    }else {
      return (
        <><Typography variant='h5' margin='25px auto' width='90%'>Shop by Category</Typography>
        <Grid container gap={{xs:1.5, sm:3}}  sx={{alignSelf:'center', justifyContent:'center', alignItems:'center', margin:'auto'}}>
          {categories.map((cat, index) => (
            
              <Grid>
              <MotionButton key={index} stylee={{Padding:'auto', margin:'auto', alignSelf:'center', }} onClick={()=> navigate('/shop', { state: { category: cat.nameEn } })}>
              
              <Stack>
              <img style={{width:'150px', height:'150px', border:'solid 2px black', borderRadius:'15px'}} src={cat.image} alt={cat.nameEn} />
              <Typography variant='h6' textAlign='center' color='black'>{cat.nameEn}</Typography>
              </Stack>
            </MotionButton>
            </Grid>
            
          ))}
        </Grid>
        </>
      );
    }


};
