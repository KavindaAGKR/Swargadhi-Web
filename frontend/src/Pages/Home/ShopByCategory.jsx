import React from 'react';
import slide from '../../Images/Slider1.jpg';
import { List, Stack, Typography } from '@mui/material';
import { MotionButton } from '../../Components/FramerMotion/MotionButton';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    nameEn: "kalka",
    nameSi:'කල්ක',
    image: slide,
  },
  {
    nameEn: "Thel",
    nameSi:'තෙල්',
    image: slide,
  },
  {
    nameEn: "Paththu",
    nameSi:'පත්තු',
    image: slide,
  },
  {
    nameEn: "Guli",
    nameSi:'ගුලි',
    image: slide,
  },
  {
    nameEn: "Chuurna",
    nameSi:'චූර්න',
    image: slide,
  },
  {
    nameEn: "Kashay",
    nameSi:'කසාය',
    image: slide,
  },
];

export const ShopByCategory = ({isSinhalaTrue}) => {
    const navigate = useNavigate();
    
    if(isSinhalaTrue){
      return (
        <List   sx={{alignSelf:'center'}}>
          {categories.map((cat, index) => (
            <MotionButton stylee={{margin:'auto'}} key={index} onClick={()=> navigate('/shop', { state: { category: cat.nameSi } })}>
              
              <Stack margin='10px'>
              <img style={{width:'150px', height:'150px'}} src={cat.image} alt={cat.nameSi} />
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
              <img style={{width:'150px', height:'150px'}} src={cat.image} alt={cat.nameEn} />
              <Typography variant='h6' textAlign='center' color='black'>{cat.nameEn}</Typography>
              </Stack>
            </MotionButton>
          ))}
        </List>
      );
    }


};
