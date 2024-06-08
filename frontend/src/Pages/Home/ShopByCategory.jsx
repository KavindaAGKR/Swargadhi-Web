import React from 'react';
import slide from '../../Images/Slider1.jpg';
import { List, Stack, Typography } from '@mui/material';
import { MotionButton } from '../../Components/FramerMotion/MotionButton';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: "Kalka",
    image: slide,
  },
  {
    name: "Thel",
    image: slide,
  },
  {
    name: "Paththu",
    image: slide,
  },
  {
    name: "Guli",
    image: slide,
  },
  {
    name: "Chuurna",
    image: slide,
  },
  {
    name: "Kashaya",
    image: slide,
  },
];

export const ShopByCategory = () => {
    const navigate = useNavigate();



  return (
    <List   m='auto'>
      {categories.map((cat, index) => (
        <MotionButton key={index} onClick={()=> navigate('/shop', { state: { category: cat.name } })}>
          
          <Stack>
          <img style={{width:'150px', height:'150px'}} src={cat.image} alt={cat.name} />
          <Typography variant='h6' textAlign='center' color='black'>{cat.name}</Typography>
          </Stack>
        </MotionButton>
      ))}
    </List>
  );
};
