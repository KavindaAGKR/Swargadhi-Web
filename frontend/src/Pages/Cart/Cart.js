import React from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'

import {Stack ,  Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartCard } from './CartCard';
import { Box } from '@mui/system';
import { Button } from '@mui/base';

export const Cart = () => {
    return (
    <React.Fragment>
        <Header/>
        <Stack>
            <Typography textAlign='center' variant='h3' padding='25px'> <ShoppingCartIcon fontSize='30' color='red'/> My Cart</Typography>

            <Stack direction='row' padding='25px'>

                <Stack sx={{width:'70%'}} justifyContent='center' alignItems='center' spacing={5}>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                <CartCard/>
                </Stack>
                <Stack>
                    <Typography>Sub Total: 7899</Typography>
                    <Typography>Delivary Charges: 450</Typography>
                    <Typography>Discount</Typography>
                    <Typography>Total Cost</Typography>
                    <Button>Proceed to Checkout</Button>
                </Stack>
            </Stack>
        </Stack>
        <Footer/>
    </React.Fragment>
    )
}
