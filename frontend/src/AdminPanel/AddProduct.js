// import { MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid';
// import React from 'react'
// import slider1 from '../Images/Slider1.jpg';
// import slider2 from '../Images/Slider2.png';
// import slider3 from '../Images/Slider3jpg.png' 





// const items = [
//     {
//       id: 1,
//       title: 'Slide 1',
//       content: 'This is the content of slide 1',
//       image: slider1,
//     },
//     {
//       id: 2,
//       title: 'Slide 2',
//       content: 'This is the content of slide 2',
//       image: slider2,
//     },
//     {
//       id: 3,
//       title: 'Slide 3',
//       content: 'This is the content of slide 3',
//       image: slider3,
//     },
//     {
//       id: 4,
//       title: 'Slide 4',
//       content: 'This is the content of slide 4',
//       image: slider1,
//     },
//     {
//       id: 5,
//       title: 'Slide 5',
//       content: 'This is the content of slide 5',
//       image: slider2,
//     },
//     {
//       id: 6,
//       title: 'Slide 6',
//       content: 'This is the content of slide 6',
//       image: slider3,
//     },
//   ];




















// export const AddProduct = () => {
// return (

//     <Paper sx={{width:'80%',height:'100%', margin:'auto'}} elevation={15} justifyContent='center' alignContent='center'>
//         <Stack  sx={{width:'auto', margin:'auto'}} justifyContent="center" alignItems="center" direction='column'>
//             <Typography variant='h3' color='success.main'>Add a new Product</Typography>
//             <TextField type='file'></TextField>
//             <TextField type='text' label='Enter Name in English'/>
//             <TextField type='text' label='Enter Name in Sinhala'/>
//             <TextField type='number' label='Enter the available quantity'/>
//             <TextField type='number' label='Price'/>
//             <TextField type='text' label='Enter the product description'/>
//             <TextField label='Select Catogory' select sx={{width:"50%"}}>
//                 <MenuItem value='kalka'>Kalka</MenuItem>
//                 <MenuItem value='Paththu'>Paththu</MenuItem>
//                 <MenuItem value='Guli'>Guli</MenuItem>
//             </TextField>
//         </Stack>

//         <div style={{ height: 400, width: '100%' }}>
//               <DataGrid
//                 rows={items}
//                 columns={[
//                   { field: 'id', headerName: 'ID', width: 90 },
//                   { field: 'title', headerName: 'Title', width: 150 },
//                   { field: 'content', headerName: 'Content', width: 250 },
//                   { field: 'image', headerName: 'Image', width: 150,
//                     renderCell: (params) => (
//                       <img src={params.value} alt={params.row.title} style={{ width: '100px', height: 'auto' }} />
//                     ),
//                   },
//                 ]}
//               />
//             </div>

//     </Paper>
    

    
// )
// }
