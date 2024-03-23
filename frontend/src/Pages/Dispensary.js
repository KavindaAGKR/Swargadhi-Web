import React, { useState } from 'react'
import { Header } from '../Components/Header'
import { Footer } from '../Components/Footer'
import { Button, Dialog, Typography } from '@mui/material'


// const ProductViewMore = (open) => {

//   return(
//     <Dialog
//     open = {open}
//     >
//       <Typography>handleUpload</Typography>




//     </Dialog>

//   )
// }





export const Dispensary = () => {

  const [openn, setOpen] = useState(false);


  return (
    <React.Fragment>
        <Header/>
        <Button onClick={()=>setOpen(true)} >ViewMore</Button>
        

        <Dialog open = {openn}>
          <Button onClick={()=>setOpen(false)}>close</Button>
          
        </Dialog>


        <Footer/>
    </React.Fragment>
  )
}
