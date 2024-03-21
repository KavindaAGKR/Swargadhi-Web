import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

export const ProductCard = ({ product }) => {
  return (
    <Box>
      <Card sx={{ maxWidth: 340, maxHeight: 500, margin: 'auto' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            width="20"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="h6" color="text.primary">
              {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
          <Button variant="outlined" color="primary" sx={{ marginLeft: '10px' }}>
            View More
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
