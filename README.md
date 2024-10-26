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

### Toggle Favorite

1. En el archivo pokemons.ts agregamos el reducer toggleFavorite para agregar favoritos:

```js
const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state[id]) {
        delete state[id];
        return;
      } else {
        state[id] = pokemon;
      }
    },
  },
});

export const { toggleFavorite } = pokemonsSlice.actions;
```

2. En el archivo PokemonCard.tsx vamos a utilizar nuestro dispatch

```js
const onToggle = () => {
  dispatch(toggleFavorite(pokemon));
};

<div
  className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
  onClick={onToggle}
>
  <div className="text-red-600">
    {isFavorite ? <IoHeart className="text-red-600" /> : <IoHeartOutline />}
  </div>
  <div className="pl-3">
    <p className="text-sm font-medium text-gray-800 leading-none">
      {isFavorite ? "Es favorito" : "No es favorito"}
    </p>
    <p className="text-xs text-gray-500">Click para cambiar</p>
  </div>
</div>;
```

### Tarea: Pagina de favoritos

Agregar en la pagina de favoritos la lista de los pokemons utilizando el store.

### Mantener favoritos

Haciendo uso del useState hacemos la persistencia de la pagina y agregamos lógica condicional para mostrar si hay pokemonsFavorites o el component noFavorites:

```js
const FavoritePokemons = () => {
  const favoritePokemons = useAppSelector((state) =>
    Object.values(state.pokemons)
  );

  const [pokemons, setPokemons] = useState(favoritePokemons || []);

  return (
    <div>
      {pokemons.length === 0 ? (
        <Nofavorites />
      ) : (
        <PokemonGrid pokemons={pokemons} />
      )}
    </div>
  );
};

export const Nofavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay favoritos</span>
    </div>
  );
};
```

### Almacenar en localStorage

Podemos guardar la lista de favoritos en 3 lugares:

1. localStorage: nunca sale de la computadora y es un espacio reservado por url o dominio. Al reiniciar la pc no se pierden los datos.

2. SessionStorage: Se mantiene unicamente mientras tengamos una instancia, una ventana de google chrome abierta. Pero si cerramos esa ventana o reiniciamos perdemos los datos guardados.

3. Cookies: es muy similar al localStorage por su persistencia durante un tiempo. Las cookies siempre viajan por peticiones http.

Todo esto es del lado del cliente: Esta primera forma de guardar en localStorage sin embargo NO SE DEBE HACER EN REDUX en solo para finalidades de entender el proceso de guardado:

```js
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
      localStorage.setItem("favorite-pokemons", JSON.stringify(state));
    },
  },
});
```

Para leer de localStorage

```js
// leer del localStorage
const getInitialState = (): PokemonsState => {
  const favorites = JSON.parse(
    localStorage.getItem("favorite-pokemons") ?? "{}"
  );

  return favorite;
};
```

Ese doble signo de pregunta (??) sirve para que cuando inicializamos el localStorage y no tengamos aun nada guardado que lo inicialice como un objeto vacio.

### Redux Toolkit - Middlewares

Un _middleware_ es una función que se coloca entre las acciones y los reducers, permitiendo interceptar, modificar, o realizar tareas adicionales en el flujo de las acciones antes de que lleguen al reducer.

Nosotros podemos ejecutar una acción o un efecto secundario cuando nuestro store cambia.

En definitiva son funciones que se ejecutan en un punto determinado del tiempo para:

- controlar efectos secundarios,
- registrar o depurar acciones o
- aplicar lógica personalizada.

#### Pasos para crear un _Custom Middleware_

1. Creamos dentro de la carpeta _store_ una nueva carpeta llamada _middleware_.

2. Dentro de la carpeta _middleware_ vamos a crear un archivo en este caso _localstorage-middleware.ts_

3. Inicializamos el archivo _localstorage-middleware_:

```js
import { MiddlewareAPI } from "@reduxjs/toolkit";

export const localStorageMiddleware = (state: MiddlewareAPI) => {};
```

4. Middleware necesita retornar una función que a su vez regresa otra función:
   (next: Dispatch) => esto es la función que queremos despachar. Es decir, cuando nosotros lo mandemos a llamar, el middleware lo va a interceptar y esta es la función dispatch que se va a ejecutar.

(accion: Action) => Esta seria la acción que se va a ejecutar.

```js
import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

export const localStorageMiddleware = (state: MiddlewareAPI) => {
  return (next: Dispatch) => (action: Action) => {};
};
```

5. Nos vamos a la parte de nuestro _index.ts_ en el store y agregamos:

```js
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
```

Se agrega la función getDefaultMiddleware se la llama a la función getDefaultMiddleware se concatena con la función custom Middleware que hicimos nosotros.

6. Por ultimo tenemos que llamar la acción y hacer nuestra condición

```js
import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";

export const localStorageMiddleware = (state: MiddlewareAPI)=>{
    return(next: Dispatch)=> (action: Action)=>{
        // para despachar la acción
        next(action)
        if (action.type === 'pokemons/toggleFavorite'){
            const {pokemons} = state.getState() as RootState;
            localStorage.setItem('favorite-pokemons', JSON.stringify(pokemons));
            return;
        }
        // console.log({state: state.getState()});
    }
}
```
Explicación:  
- Dispara la acción con  next(action), 
- Si el action.type es name/reducer (pokemons/toggleFavorite) ejecuta lo siguiente: 
- En una constante vamos a extraer con state.getState => los pokemons.
Nota: el *as RootState* simplemente es para poder tener las opciones dentro de las llaves de la extracción.
- y en el localstorage hacemos el set.  
