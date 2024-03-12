import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { Phone, Email, WhatsApp, Facebook } from '@mui/icons-material';
import logo from '../images/2121.jpg';
import './Footer.css';

function Footer() {
  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <img src={logo} alt="Company Logo" className="footer-logo" />
        <div className="footer-links">
          <Link href="#" underline="hover">Home</Link>
          <Link href="#" underline="hover">Shop</Link>
          <Link href="#" underline="hover">Dispensary</Link>
          <Link href="#" underline="hover">About Us</Link>
          <Link href="#" underline="hover">My Account</Link>
        </div>
        <Divider />
        <Box className="footer-contact">
          <Typography variant="body2" className="footer-contact-item">
            <Phone /> 081 7822142
          </Typography>
          <Typography variant="body2" className="footer-contact-item">
            <Email /> swargadhi@gmail.com
          </Typography>
          <Typography variant="body2" className="footer-contact-item">
            <WhatsApp /> 071 1947550
          </Typography>
        </Box>
        <Box className="footer-social">
          <Link href="https://web.facebook.com/profile.php?id=100063950014549" className="footer-social-item">
            <Facebook /> Facebook
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
