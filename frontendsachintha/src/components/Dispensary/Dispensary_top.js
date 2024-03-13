import React from "react";
import { Box, Typography } from "@mui/material";

export default function DispensaryTop() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        paddingTop: '13px',
        paddingBottom: '13.47px',
        background: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex'
      }}
    >
      <Box sx={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', gap: 20, display: 'inline-flex' }}>
      <img style={{ width: 85, height: 83.53 }} src="/images/2121.jpg" alt="Placeholder" />

        <Typography sx={{ textAlign: 'center', color: '#384160', fontSize: 30, fontFamily: 'Josefin Sans', fontWeight: '700', wordWrap: 'break-word' }}>DISPENSARY</Typography>
      </Box>
    </Box>
  );
}
