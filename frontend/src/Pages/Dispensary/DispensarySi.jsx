
import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ScrollToTop from 'react-scroll-to-top';
import { SwiperSlider } from '../../Components/Swiper';
import { motion } from 'framer-motion';

const initialTreatments = [];

export const DispensarySi = () => {
  const [treatments, setTreatments] = useState(initialTreatments);
  const sectionRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);
    const fetchTreatments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/treatment/treatmentsSi');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setTreatments(data);
          sectionRefs.current = data.map(() => React.createRef());
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

  const scrollToSection = (index) => {
    if (sectionRefs.current[index] && sectionRefs.current[index].current) {
      sectionRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Section reference is null');
    }
  };
  useEffect(() => {
    // Ensure that sectionRefs is correctly populated
    if (treatments.length > 0 && sectionRefs.current.length !== treatments.length) {
      sectionRefs.current = treatments.map(() => React.createRef());
    }
  }, [treatments]);
  

  return (
    <React.Fragment>
      <ScrollToTop smooth={true} />
      <Header />
      <Stack color="green" direction="row" margin="25px" justifyContent="center" gap={2}>
        <MedicalInformationIcon sx={{ fontSize: '60px' }} />
        <Typography variant="h3">වෛද්‍ය මධ්‍යස්ථානය</Typography>
      </Stack>



      {
          loading ? (<Stack margin='auto'><Typography variant='body'>Loading Treatments... <CircularProgress color='success'/></Typography></Stack>):
          (
      <Stack direction="row" height="500px" margin="50px">
        <Stack
          width="40%"
          component={motion.div}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 2 }}
        >
         <SwiperSlider
            imageArray={treatments.flatMap(treatment =>
                treatment.images.map(image => ({ src: `http://localhost:5000${image}`, alt: treatment.treatmentName }))
            )}
            altName="Dispensary Treatments"
            styles={{
                width: '100%',
                '--swiper-navigation-color': '#0DFE0D',
                '--swiper-pagination-color': '#0DFE0D',
            }}
            />

        </Stack>

        <Container
          sx={{ backgroundColor: '#F9E8E8', margin: '0px 20px', borderRadius: '15px' }}
          component={motion.div}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h4" textAlign="center" margin="25px">
          ප්‍රතිකාර ක්‍රම
          </Typography>
          <Stack gap={3}>
            {treatments.map((item, i) => (
              <Stack
                key={item.treatmentName}
                justifyContent="space-between"
                direction="row"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  fontWeight: 'bold',
                  padding: '0 15px',
                }}
                component={motion.div}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <Typography variant="h6">{item.treatmentNameSi}</Typography>
                <motion.button
                  onClick={() => scrollToSection(i)}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    padding: '0',
                  }}
                >
                  See More
                </motion.button>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Stack>)}

      <Stack margin="auto" alignItems="center">
        {treatments.map((item, i) => (
          <motion.div
            key={item.treatmentName}
            ref={sectionRefs.current[i]}
            style={{ width: '70%', justifyContent: 'center' }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 2 }}
          >
            <Stack backgroundColor="#C6F6D4" style={{ borderRadius: '20px', margin: '25px auto', padding: '20px' }}>
              <Typography variant="h4" textAlign="center">
                {item.treatmentName}
              </Typography>
              <Typography variant="h4" textAlign="center">
                {item.treatmentNameSi}
              </Typography>
              <Typography variant="h6" textAlign="center" color="textSecondary">
                Price: {item.price} LKR
              </Typography>
              <Stack direction="row" margin="20px" height="500px">
                <img
                  src={`http://localhost:5000${item.images[0]}`}
                  style={{ width: '35%', height: 'auto' }}
                  alt={item.treatmentName}
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = 'path_to_placeholder_image'; // Optional: provide a placeholder image
                  }}
                />
                <Container sx={{ textAlign: 'justify' }}>
                  <Typography variant="body1">{item.description}</Typography>
                </Container>
              </Stack>
            </Stack>
          </motion.div>
        ))}
      </Stack>

      <Footer />
    </React.Fragment>
  );
};
