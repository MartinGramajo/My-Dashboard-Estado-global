// creamos el fetch para hacer la consulta a la api

import { PokemonsResponse, SimplePokemon } from "@/app/pokemons";
import PokemonGrid from "@/app/pokemons/components/PokemonGrid";





export const metadata = {
 title: 'Listado de Pokemons',
 description: 'Listado de pokemons',
};


// tipamos  la consulta con nuestra interfaces.
const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name
  }));

 // Manejo de error 500 
//  throw new Error('Esto es un error que no debería suceder')

// funcion de notFound()
// throw notFound();


  return pokemons;
};

export default async function PokemonsPage() {
  // guardamos los datos de la promesa en la constante
  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col">
      <span className="text-4xl my-2">
        Listado de Pokemons <small className="text-blue-500"> estatico</small>
      </span>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
