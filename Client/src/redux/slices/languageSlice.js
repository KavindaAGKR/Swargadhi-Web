import { createSlice } from '@reduxjs/toolkit';


const loadState = () => {
  try {
      const langState = localStorage.getItem('isSinhala');
      if (langState === null) {
          return { isSinhala: false };
      }
      return { isSinhala: JSON.parse(langState) };
  } catch (err) {
      return { isSinhala: false };
  }
};


const saveState = (state) => {
      const langState = JSON.stringify(state.isSinhala);
      localStorage.setItem('isSinhala', langState);
};
export const languageSlice = createSlice({

    name: 'language',

    initialState: loadState(),

      reducers:{

      setSinhalaTrue:(state, action) =>{
        state.isSinhala = true;
        saveState(state);
      },
      setSinhalaFalse:(state, action) =>{
        state.isSinhala = false;
        saveState(state);
      }

      }

})



export const { setSinhalaTrue, setSinhalaFalse } = languageSlice.actions;

export const selectIsSinhalaTrue = (state)=> state.language.isSinhala;

export default languageSlice.reducer;


