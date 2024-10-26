'use client'
import PokemonGrid from '@/app/pokemons/components/PokemonGrid'
import { useAppSelector } from '@/store'
import React from 'react'

const FavoritePokemons = () => {

    const favoritePokemons = useAppSelector((state) => Object.values(state.pokemons))

 

  return (
    <div>
       <PokemonGrid pokemons={favoritePokemons } />
    </div>
  )
}

export default FavoritePokemons;
