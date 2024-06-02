import React from 'react'
import { Button, Grid, Paper,  Stack,  Typography } from '@mui/material'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { Call, Email, Facebook, WhatsApp } from '@mui/icons-material'
import LocationCityIcon from '@mui/icons-material/LocationCity';


export const AboutSi = () => {
return (
    <React.Fragment>
        <Header/>
    
        <Stack sx={{ margin:'50px', textAlign: 'center', }} >
        
        <Stack direction='row' margin="auto" color='green'>
                <LocationCityIcon sx={{fontSize:'50px'}} />
                <Typography variant='h3' color='success.main' sx={{marginBottom:'50px'}}>ස්වර්ගධී ගැන</Typography>
                </Stack>
            
            <Typography variant='h5' sx={{marginBottom:'20px'}}>ස්වර්ගධී ගැන</Typography>
            <Typography variant='body'>රෝගවලට ප්‍රතිකාර කිරීමට හෝ සෞඛ්‍යය පවත්වා ගැනීමට භාවිතා කරන උද්භිද විද්‍යාව හෝ ශාක වලින් සාදන ලද නිෂ්පාදන ඖෂධීය නිෂ්පාදන, උද්භිද නිෂ්පාදන හෝ ෆයිටොමෙඩිසින් ලෙස හැඳින්වේ. ශාක වලින් සාදන ලද සහ අභ්යන්තර භාවිතය සඳහා පමණක් භාවිතා කරන නිෂ්පාදනයක් ඖෂධීය අතිරේකයක් ලෙස හැඳින්වේ. බොහෝ බෙහෙත් වට්ටෝරු සහ කවුන්ටර ඖෂධ ද ශාක නිෂ්පාදන වලින් සාදා ඇත, නමුත් මෙම නිෂ්පාදනවල අඩංගු වන්නේ පිරිසිදු කළ අමුද්‍රව්‍ය පමණක් වන අතර ඒවා FDA විසින් නියාමනය කරනු ලැබේ. ඖෂධීය අතිරේකවල සම්පූර්ණ ශාක හෝ ශාක කොටස් අඩංගු විය හැක.</Typography>
            <Typography variant='h5'sx={{marginBottom:'20px',marginTop:'50px'}}>වෛද්‍යවරුන්</Typography>
            <Typography variant='body'>වෛද්‍ය ගයාන් සේනානායක</Typography>
            <Typography variant='h5' sx={{marginBottom:'20px',marginTop:'50px'}}>වෛද්‍ය සහතික</Typography>
            <Typography variant='body'>FDA සලකනු ලබන්නේ ඖෂධීය අතිරේක ආහාර මිස ඖෂධ නොවේ. එමනිසා, ඒවා ඖෂධවලට සමාන පරීක්ෂණ, නිෂ්පාදනය සහ ලේබල් කිරීමේ ප්‍රමිති සහ රෙගුලාසි වලට යටත් නොවේ.
ඖෂධ පැළෑටි ශරීරයේ විවිධ ක්‍රියාවන්ට බලපාන ආකාරය පැහැදිලි කරන ලේබල් දැන් ඔබට දැක ගත හැකිය. කෙසේ වෙතත්, ඖෂධීය අතිරේක ලේබල් විශේෂිත වෛද්ය තත්වයන්ට ප්රතිකාර කිරීම සඳහා යොමු විය නොහැක. මක්නිසාද යත්, ඖෂධීය අතිරේක සායනික අත්හදා බැලීම්වලට හෝ බෙහෙත් වට්ටෝරුවේ හෝ සාම්ප්‍රදායික ප්‍රති-පිළිවෙලින් ලබා දෙන ඖෂධ වැනි නිෂ්පාදන ප්‍රමිතීන්ට යටත් නොවන බැවිනි.</Typography>
            <Typography variant='h5'sx={{marginBottom:'20px',marginTop:'50px'}}>අපව අමතන්න</Typography>
            <Stack direction='column' spacing={1} justifyContent="center" padding="25px" alignItems='center'>
                    
                    <Button variant='text' startIcon={<Call/>} sx={{justifyContent:'left'}}>081 7822142</Button>
                    <Button variant='text' startIcon={<Email/>} sx={{justifyContent:'left'}}>swargadhi@gmail.com</Button>
                    <Button variant='text' startIcon={<WhatsApp/>} sx={{justifyContent:'left'}}>071 1947550</Button>
                    <Button variant='text' startIcon={<Facebook/>} sx={{justifyContent:'left'}} href='https://web.facebook.com/profile.php?id=100063950014549'>ස්වර්ගධී ආයුර්වේද නිෂ්පාදන</Button>
                    </Stack>
        </Stack>
        
    <Footer/>
    </React.Fragment>
)
}





