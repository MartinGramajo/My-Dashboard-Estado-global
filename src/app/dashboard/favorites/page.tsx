import FavoritePokemons from "@/app/pokemons/components/FavoritePokemons";



export const metadata = {
 title: 'Favoritos',
 description: 'Listado de pokemons',
};



export default async function FavoritesPokemonsPage() {
  


  return (
    <div className="flex flex-col">
      <span className="text-4xl my-2">
        Listado de Pokemons <small className="text-red-600"> Global State</small>
      </span>
      <FavoritePokemons />

    </div>
  );
}







