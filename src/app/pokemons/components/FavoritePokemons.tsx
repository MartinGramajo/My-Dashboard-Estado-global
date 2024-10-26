"use client";
import PokemonGrid from "@/app/pokemons/components/PokemonGrid";
import { useAppSelector } from "@/store";
import React, { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";

const FavoritePokemons = () => {
  const favoritePokemons = useAppSelector((state) =>
    Object.values(state.pokemons.favorites)
  );

  const [pokemons, setPokemons] = useState(favoritePokemons);

  useEffect(() => {
    // setPokemons(favoritePokemons);
  }, [favoritePokemons]);

  return (
    <div>
      {favoritePokemons.length === 0 ? (
        <Nofavorites />
      ) : (
        <PokemonGrid pokemons={favoritePokemons} />
      )}
    </div>
  );
};

export default FavoritePokemons;

export const Nofavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay favoritos</span>
    </div>
  );
};
