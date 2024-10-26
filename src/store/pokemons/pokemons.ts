import { SimplePokemon } from "@/app/pokemons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonsState {
  [key: string]: SimplePokemon;
}

// leer del localStorage

const getInitialState = (): PokemonsState=>{

  // if( typeof localStorage === "undefined") return {};

  const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');
  return favorites;   
}

const initialState: PokemonsState = {
  ...getInitialState(),


  // "1": { id: "1", name: "bulbasaur" },
  // "3": { id: "3", name: "venusaur" },
  // "5": { id: "5", name: "Charmeleon" },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state[id]) {
        delete state[id];
        // return;
      } else {
        state[id] = pokemon;
      }

      // TODO: No se debe de hacer en redux de esta forma es solo para finalidad de entendimiento
      localStorage.setItem('favorite-pokemons', JSON.stringify(state));
    }
  }
});

export const {toggleFavorite} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
