import { SimplePokemon } from "@/app/pokemons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonsState {
  favorites: {[key: string]: SimplePokemon;}

}

// leer del localStorage
// const getInitialState = (): PokemonsState=>{
// if( typeof localStorage === "undefined") return {};
//   const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');
//   return favorites;   
// }

const initialState: PokemonsState = {
  // ...getInitialState(),
  favorites: {},
  // "1": { id: "1", name: "bulbasaur" },
  // "3": { id: "3", name: "venusaur" },
  // "5": { id: "5", name: "Charmeleon" },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {

    setFavoritePokemons(state, action:PayloadAction<{[key: string]: SimplePokemon;}>){
      state.favorites = action.payload;
    },


    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state.favorites[id]) {
        delete state.favorites[id];
        // return;
      } else {
        state.favorites[id] = pokemon;
      }

      // TODO: No se debe de hacer en redux de esta forma es solo para finalidad de entendimiento
      localStorage.setItem('favorite-pokemons', JSON.stringify(state.favorites));
    }
  }
});

export const {toggleFavorite, setFavoritePokemons} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
