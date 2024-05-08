import { createSlice } from '@reduxjs/toolkit';


export const languageSlice = createSlice({

    name: 'language',

    initialState: {
        isSinhala: false
      },

      reducers:{

      setSinhalaTrue:(state, action) =>{
        state.isSinhala = true;
      },
      setSinhalaFalse:(state, action) =>{
        state.isSinhala = false;
      }

      }

})



export const { setSinhalaTrue, setSinhalaFalse } = languageSlice.actions;

export const selectIsSinhalaTrue = (state)=> state.language.isSinhala;

export default languageSlice.reducer;