# My Dashboard Parte 4 - favoritos - redux middlewares - localStorage

### Continuación de la aplicación

Siempre tenemos que tener en cuenta que la regla de oro en next es que _todo es server component_, siempre pensarlo en el árbol y donde alguna de sus hojas son _use client_ o que se renderizan del lado de cliente como ser Hooks o localstorage.

### Page Favorites - Pokemon Slice

Creamos dentro del store : la carpeta pokemons con el archivo _pokemons.ts_ en donde tenemos el pokemonsSlice y lo llamamos dentro de nuestro archivo index.ts dentro de store para poder verlo con la extension de redux en el navegador.

### Mostrar cambios UI - Favorites

1. Traemos de nuestro store la lista con los pokemons favoritos.
   NOTA: Al usar un hook tenemos que transformar el component en un 'use client'.

```js
const isFavorite = useAppSelector((state) => state.pokemons);
```

2. Pero no queremos traer toda la lista, lo que nosotros apuntamos es preguntar por id, si ese Pokemon existe.
   El id que utilizamos es el que extraemos de pokemon para hacer la pregunta.

```js
const PokemonCard = ({ pokemon }: Props) => {
  const { id, name } = pokemon;

  const isFavorite = useAppSelector((state) => state.pokemons[id]);
};
```

El retorno de esto seria:

```js
{id:'1', name: 'bulbasaur'}
150 undefined
```

3. Pero en lugar de tener el objeto podemos aplicar la _doble negacion_ (!!) para que lo transforme a un valor boolean.

```js
const isFavorite = useAppSelector((state) => !!state.pokemons[id]);
```

Otra forma de preguntar para traer un valor boolean:

```js
const isFavorite = useAppSelector((state) => state.pokemons[id] !== undefined);
```

El retorno de esto seria:

```js
true
150 false
```

Por ultimo con ese valor que nos retorna, lo utilizamos para mostrar un icono u otro dependiendo del valor del booleano:

```js
 <div className="text-red-600">
              {
                isFavorite? (
                  <IoHeart className="text-red-600" />
                ) : (
                  <IoHeartOutline />
                )
              }

            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
              {
                isFavorite ? "Es favorito" : "No es favorito"
              }
              </p>
              <p className="text-xs text-gray-500">Click para cambiar</p>
            </div>

```

##### Teoría de la doble negación

Su objetivo es convertir un valor a su equivalente booleano

1. Primera negación (!): Convierte el valor a un booleano y luego lo niega. Esto significa que un valor "truthy" (que se evalúa como verdadero) se convertirá en false, y un valor "falsy" (que se evalúa como falso) se convertirá en true.

2. Segunda negación (!): Toma el resultado de la primera negación y lo niega de nuevo, lo que devuelve el valor original en forma booleana.

```js
let value = 0;

let result = !!value;
// Primera negación convierte 0 a true,
// segunda negación convierte true a false
console.log(result); // false
```
