'use client'

import { Provider } from "react-redux"
import { store } from './'; 
import { useEffect } from "react";
import { setFavoritePokemons } from "./pokemons/pokemons";



interface Props {
    children : React.ReactNode
}

const Providers = ({children}: Props) => {

  // carga inicial de los pokemons 

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');

    console.log(favorites);
    
    store.dispatch( setFavoritePokemons(favorites))
  }, [])
   

  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default Providers
