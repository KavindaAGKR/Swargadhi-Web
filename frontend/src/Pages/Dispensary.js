import React, { useState } from 'react';
import { Typography, Paper, Box, Card, CardActionArea, CardMedia, CardContent, Button, Tab, Stack } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import slider1 from './Images/Slider1.jpg';
import slider2 from './Images/Slider2.png';
import slider3 from './Images/Slider3.png';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Style } from '@mui/icons-material';
import { makeStyles } from '@mui/styles'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  


  palette: {
    primary: {
      main: '#00e676',
    },
    secondary: {
      main: '#ff1744',
    },
  },

  tab:{
  borderRadius:"50px",
  backgroundColor:'black',
  color:'white'
  
  }

}));






const items = [
  {
    id: 1,
    title: 'Slide 1',
    content: 'This is the content of slide 1',
    image: slider1,
  },
  {
    id: 2,
    title: 'Slide 2',
    content: 'This is the content of slide 2',
    image: slider2,
  },
  {
    id: 3,
    title: 'Slide 3',
    content: 'This is the content of slide 3',
    image: slider3,
  },
  {
    id: 4,
    title: 'Slide 4',
    content: 'This is the content of slide 4',
    image: slider1,
  },
  {
    id: 5,
    title: 'Slide 5',
    content: 'This is the content of slide 5',
    image: slider2,
  },
  {
    id: 6,
    title: 'Slide 6',
    content: 'This is the content of slide 6',
    image: slider3,
  },
];

export const Dispensary = () => {


  const classes = useStyles();

  const [value , setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  

  return (
    <>


<ThemeProvider theme={theme}>
    <Stack sx={{ justifyContent:'center' , alignItems:'center' }}>
    <TabContext value={value}  >
  <Box sx={{ borderBottom: 0, borderColor: 'divider', margin:'auto'   }} >
    <TabList textColor='secondary'
  indicatorColor="none"  onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons allowScrollButtonsMobile sx={{justifyContent:'space-between'}}>
      <Tab className={classes.tab} label="All Products" value="1" color='success' />
      <Tab className={classes.tab} label="Item Two" value="2" />
      <Tab className={classes.tab} label="Item Three" value="3" />
    </TabList>
  </Box>


  <TabPanel value="1">   <Paper sx={{width:'100%'}}><Typography variant='h4'>Hello World</Typography></Paper>
  </TabPanel>
  <TabPanel value="2">Item Two
  <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>
                <img src={item.image} alt={item.title} style={{ width: '100px', height: 'auto' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
  
  
  
  
  
  </TabPanel>
  <TabPanel value="3">Item Three
  
  <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={items}
                columns={[
                  { field: 'id', headerName: 'ID', width: 90 },
                  { field: 'title', headerName: 'Title', width: 150 },
                  { field: 'content', headerName: 'Content', width: 250 },
                  { field: 'image', headerName: 'Image', width: 150,
                    renderCell: (params) => (
                      <img src={params.value} alt={params.row.title} style={{ width: '100px', height: 'auto' }} />
                    ),
                  },
                ]}
              />
            </div>
  
  
  
  </TabPanel>
</TabContext>
    </Stack>

    </ThemeProvider>


    </>
  );
};





// <Carousel
//       sx={{
//         width: '80%',
//         margin: 'auto',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '0',
//       }}
//       navButtonsAlwaysVisible
//     >
//       {/* Map through items and create a Paper container for each group of cards */}
//       <Paper sx={{ width: '100%', backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         {items.map((item) => (
//           <Box  borderRadius={8} boxShadow={3} className="rounded-card" sx={{ margin: '10px' }}>
//             <Card>
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="250"
//                   image={item.image}
//                   alt={item.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {item.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {item.content}
//                   </Typography>
//                   <Typography variant="h6" color="text.primary">
//                     {item.id}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardContent>
//                 <Button variant="contained" color="primary">
//                   Add to Cart
//                 </Button>
//                 <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
//                   View More
//                 </Button>
//               </CardContent>
//             </Card>
//           </Box>
//         ))}
//       </Paper>
//     </Carousel>