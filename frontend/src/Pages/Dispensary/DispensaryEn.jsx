import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { Box, Breadcrumbs, Button, CircularProgress, Container, List, Stack, Typography } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ScrollToTop from 'react-scroll-to-top';
import { SwiperSlider } from '../../Components/Swiper';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';



export const DispensaryEn = () => {
  const [treatments, setTreatments] = useState([]);
  const [errorLoading, setErrorLoading] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);
    const fetchTreatments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/treatment/treatments');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setTreatments(data);
          
          
        } else {
          console.error('Expected data to be an array');
          
        }
        setLoading(false);
      } catch (error) {
        
        console.error('Error fetching treatments:', error);
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);
  

  const sectionRefs = useRef([]);
  sectionRefs.current = treatments.map(
    (item, i) => sectionRefs.current[i] ?? React.createRef()
  );
  // Function to scroll to a specific section
  const scrollToSection = (index) => {
    sectionRefs.current[index].current.scrollIntoView({ behavior: 'smooth', block:'center' });
  };




  return (
  <React.Fragment >
    <ScrollToTop smooth={true}/>
    <Header/>
        
      <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:'15px'}}>
            <Typography color="#9A9A9A" noWrap component={Link} to="/" sx={{ textDecoration: 'none',fontSize:'14px' }}>
                Home
            </Typography>
            
            <Typography color="#9A9A9A" noWrap sx={{ textDecoration: 'none',fontSize:'14px' }}>
            Dispensary
            </Typography>
      </Breadcrumbs>
      <Stack minHeight='1000px'>
        <Stack  color='green'  direction='row' margin='25px' justifyContent='center' alignItems='center' gap={2}>
                <MedicalInformationIcon sx={{fontSize:'40px'}} />
                <Typography variant='h4'  >
                Dispensary
                </Typography>
        </Stack>


        {
          loading ? (<Stack margin='auto'><Typography variant='body'><CircularProgress color='success'/></Typography></Stack>):
          (
            
              treatments.length >0 ? (
                <Stack direction={{xs:'column', md:'row'}} width='90%' minHeight='450px'  margin='auto'  gap={2}
            component={motion.div}
              initial={{ opacity: 0 ,}}
    whileInView={{ opacity: 1  }}
    viewport={{ amount:0.3}}
    transition={{ duration: 2 }}
            
            >

    <Stack m='auto' width={{xs:'90%',sm:'60%', md:'450px'}} height={{xs:'200px',sm:'250px', md:'300px'}} >
  
              <SwiperSlider
      imageArray={treatments.flatMap(treatment =>
    treatment.images.map((image, i) => ({
      src: `http://localhost:5000${image}`,
      alt: treatment.treatmentName,
    }))
  )}

  altName="Dispensary Treatments"
  styles={{
    width:'100%',
    borderRadius:'15px',
    '--swiper-navigation-color': '#0DFE0D',
    '--swiper-pagination-color': '#0DFE0D',
  }}
/>

  
              </Stack>
  
              
            <Stack sx={{backgroundColor:'#F9E8E8', margin:'0px auto' , borderRadius:'15px' ,padding:'20px', width:{xs:'80%', md:'60%'}}} 
              >
                <Typography variant='h5' textAlign='center' mb='30px' fontWeight='bold'>Available Treatments</Typography>
                <Stack gap={3}>
  
                  {
                    treatments.map(
                      (item, i) => 
                        (
                        <Stack key={i}
                        justifyContent='space-between' direction='row' 
                        sx={{backgroundColor:'white',
                        borderRadius:'15px',
                        
                        padding:'0 15px',}}
                        component={motion.div}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.1 }
                        }}
                        >
                          <Typography variant='body2'  m='auto 0px'>{item.treatmentName} </Typography>
                          <Button sx={{fontSize:'10px'}} onClick={() => scrollToSection(i)}>See More</Button>
                        </Stack>
                        
                      )
                    )
                  }
  
                </Stack>
  
                
              </Stack>
            </Stack>
              ):(<Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>Treatment Methods Unavailable</Typography>
              )
            
            
  )
        }










          <Stack margin='auto' alignItems='center' width='95%'>
          


{
  treatments.map((item, i) => 

            (
              <motion.div 
              key={i} 
              ref={sectionRefs.current[i]}
             
              style={{width:'98%', justifyContent:'center', margin:'auto'}}
              initial={{ opacity: 0 , }}
  whileInView={{ opacity: 1,  }}
  viewport={{ amount:0.1}}
  transition={{ duration: 2 }}

              >
              <Stack 
              backgroundColor='#C6F6D4' sx={{borderRadius:'15px',margin:'25px auto ', padding:'20px',  height:'500px'}} >
              <Typography variant='h5'  textAlign='center' fontWeight='bold'  noWrap>{item.treatmentName}</Typography>
              
              <Stack direction={{xs:'column', md:'row'}}  width='100%' height='90%' margin='auto' gap={2}>
              <Stack sx={{ width:{xs:'100%', md:'35%'}, height:{xs:'180px', md:'auto'}, margin:'10px auto'    }}>
              <Box sx={{width:{xs:'270Px', md:'100%'}, height:{xs:'180Px', md:'300px'}, margin:'0px auto'}}>
              <img
                  src={`http://localhost:5000${item.images[0]}`}
                  style={{width:'100%', height:'100%', margin:'0px auto', borderRadius:'15px',objectFit:'cover'}}
                  alt={item.treatmentNameSi}
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.onerror = null; 
                  }}
                />
              </Box>
              </Stack>
            <Stack sx={{height:{xs:'250px', md:'450px'}, width:{xs:'100%', md:'65%'}}}>
            
            <List
            sx={{
              width: 'auto',
              height:'95%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow:'auto',
              backgroundColor:'transparent',
              textAlign:'justify',
              
            }}
            
            >
            {item.description}
            </List>
            
            </Stack>
              </Stack>
              </Stack>
              </motion.div>
            )

  )
}

            
          </Stack>
          </Stack>


        <Footer/>
    </React.Fragment>
  )
}