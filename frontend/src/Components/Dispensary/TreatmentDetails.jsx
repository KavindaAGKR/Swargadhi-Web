import React, {useRef} from 'react'


import {Container, Stack, Typography } from '@mui/material'
import { motion } from "framer-motion"




export const TreatmentDetails = (treatments) => {


       
    const variant ={
        visible: {scale: 1, opacity: 1},
        hidden: {scale: 0, opacity: 0} 
      }

      const descriptionVariant = {
        visible: { opacity: 1, x:0 ,y: 0 },
        hidden: { opacity: 0,x:-400, y:0},
      };

       

      const transitionTime = {
        duration: 1.2,
        ease: "easeInOut",

      }
      const sectionRefs = useRef(Array(treatments.length).fill(null).map(() => React.createRef()));

      // Function to scroll to a specific section
      const scrollToSection = (index) => {
        sectionRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
      };
    
  


  return (
    
        treatments.map((item, i) => 
      
                (
                    <motion.div 
                  variants={descriptionVariant}
                  initial="hidden"
                  whileInView="visible">
ref={sectionRefs.current[i]}
                  
                    <Stack key={item.key} 
                    backgroundColor='#C6F6D4' style={{margin:'25px', borderRadius:'20px', padding:'20px'}}>
                    <Typography variant='h4'  textAlign='center'>{item.treatmentNameEn}</Typography>
                    <Stack direction='row' margin='20px' height='500px'>
                    <img  src={item.images} style={{width:'35%', height:'auto'}}/>
                  <Container sx={{textAlign:'justify'}}>
                  
                  
                  <Typography variant='body'  >{item.descriptionEn}</Typography>
                  
                  </Container>
                    </Stack></Stack>
                    </motion.div>
                )
      
        )
      
  )
}
