import React from 'react';
import slide from '../../Images/category/Edited-68.jpg';
import { List, Stack, Typography } from '@mui/material';
import { MotionButton } from '../../Components/FramerMotion/MotionButton';
import { useNavigate } from 'react-router-dom';

import slide1 from '../../Images/category/chuurna.jpg'
import slide2 from '../../Images/category/Guli.jpg'
import slide3 from '../../Images/category/pottani.jpg'
import slide4 from '../../Images/category/thel.jpg'
import slide5 from '../../Images/category/Edited-141-300x300.jpg'


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
    nameSi:'චූර්න',
    image: slide1,
  },
  {
    nameEn: "Kashay",
    nameSi:'කසාය',
    image: slide3,
  },
];

export const ShopByCategory = ({isSinhalaTrue}) => {
    const navigate = useNavigate();
    
    if(isSinhalaTrue){
      return (
        <List   sx={{alignSelf:'center'}}>
          {categories.map((cat, index) => (
            <MotionButton stylee={{margin:'auto',}} key={index} onClick={()=> navigate('/shop', { state: { category: cat.nameSi } })}>
              
              <Stack margin='10px'>
              <img style={{width:'150px', height:'150px', border:'solid 2px black'}} src={cat.image} alt={cat.nameSi} />
              <Typography variant='h6' textAlign='center' color='black'>{cat.nameSi}</Typography>
              </Stack>
            </MotionButton>
          ))}
        </List>
      );
    }else {
      return (
        <List   sx={{alignSelf:'center'}}>
          {categories.map((cat, index) => (
            <MotionButton key={index} stylee={{margin:'10px'}} onClick={()=> navigate('/shop', { state: { category: cat.nameEn } })}>
              
              <Stack>
              <img style={{width:'150px', height:'150px', border:'solid 2px black'}} src={cat.image} alt={cat.nameEn} />
              <Typography variant='h6' textAlign='center' color='black'>{cat.nameEn}</Typography>
              </Stack>
            </MotionButton>
          ))}
        </List>
      );
    }


};
