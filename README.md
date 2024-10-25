# My Dashboard - Redux toolkit - Parte 3 

### Continuación de la aplicación

En este apartado, lo que hicimos fue crear una nueva vista para los pokemons favoritos y en el dashboard en la pagina del main creamos un nuevo component _SimpleWidget_ con el que vamos a trabajar.

### Instalación y configuración de Redux Toolkit

Link para la instalación

https://redux-toolkit.js.org/introduction/getting-started

Pasos de instalación

1. Creamos la carpeta store y en el archivo index.ts vamos a copiar lo siguiente de la documentación:

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
```

Nota: el _store_ en Redux es un objeto central que mantiene el estado global de la aplicación. Almacena el estado actual y permite que las distintas partes de la aplicación accedan a el y lo actualicen de manera predecible.

2. Tenemos que configurar el Provider con el store

El provider es un component de React que hace que el store de Redux este disponible para toda la aplicación o al menos para el arbol de componentes que se encuentre dentro de el.

Nota: Todos mis componentes en next +13 pasan por mi _layout.txt_, no por mi page.tsx
Esto se debe porque en mi layout es donde coloco cosas de _manera global_.

##### Porque no puedo utilizar el Provider como nos indica en la documentación?

Si colocamos el provider en nuestro archivo _layout.tsx_ (donde coloco las cosas que quiero que se rendericen de manera global) tal como nos indica la documentación, nos rompe la aplicación porque nos obliga a que utilicemos el 'use-client' y como es un archivo que no podemos utilizar el renderizado por parte del cliente tenemos que crear otro archivo.

Ahi es donde entra en juego el archivo _Providers.tsx_ que colocamos dentro de nuestra carpeta _store_. Este archivo es el que vamos a utilizar dentro de nuestro _layout.tsx_ de esta forma mantenemos las reglas impuesta por next.

```js
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

_Nota_: Si bien esta implementación no es perfecto, pero cumple con su finalidad.

### Counter Slice

3. Un _slice_ o _state slice_ es una porción o sección del estado global que se maneja de forma independiente.

Cada slice contiene la lógica necesaria para gestionar una parte especifica del estado de la aplicación, agrupando tanto el estado como los reducers y las acciones relaciones en un solo lugar.
Cuando definimos un slice, definimos:

- _El estado inicial_

- _Los reducers_ que modifican ese estado en respuesta a las acciones. Es decir, llamamos a las acciones de cualquier lugar de nuestro app para que cambien el valor del estado inicial.

- _Las Acciones_ que se generan automáticamente según los reducers.

_NOTA_: Se aconseja que los _state_ cuando creamos su interface siempre sean _object_ para poder extenderlo de manera mas fácil.

Por otra parte, podemos crear el slice donde nosotros creamos convenientes, en este caso, lo creamos dentro de la carpeta _store_ para tener todo agrupado.

```js
// snippet para la creación:  rxslice

import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 5
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {}
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
```

4. En la carpeta _store_ en el archivo _index.ts_ tenemos que importa el _counterSlice_ que creamos en el punto 3 y utilizarlo dentro de nuestro reducer:

```js
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter/counterSlice";

export const store = configureStore({
  reducer: {
    counterReducer
  }
});
```

### Exportando redux toolkit hooks

5. Una vez importado el archivo de counterSlice y utilizado en el reducer, dentro de la documentación nos tenemos que ir al apartado _Redux Toolkit TypeScript Quick Start_ para poder configurar los hooks que nos recomienda para utilizarlo en lugar del useDispatch (es un hook que nos retorna la _función dispatch_ que se comunica con nuestro store para hacer el dispatch de acciones ) y el useSelector (sirve para tomar cierta parte de nuestro state y que cuando esa parte del state cambie o se modifique podamos redibujar nuestro componente). Esto se debe a que estamos haciendo uso de Typescript.

Entonces usaremos:

- _useAppDispatch_ para disparar acciones.
- _useAppSelector_ para escuchar y leer como esta nuestro store.

```js
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter/counterSlice'

// nos aseguramos de importar el useDispatch y el useSelector.
import { useDispatch, useSelector } from 'react-redux'


export const store = configureStore({
  reducer: {
    counterReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

```

_Con estas configuraciones ya estamos listo para utilizar nuestro counterSlice._

### Counter Reducer y acciones

Ahora nos toca crear las acciones que van a mutar nuestro state inicial. Para ello, vamos a trabajar en el archivo _counterSlice.ts_ en el apartado de los reducers creando nuestras acciones.

```js
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addOne(state) {
      state.count++;
    },
    substractOne(state) {
      if (state.count === 0) return;
      state.count--;
    },

    resetCount(state, action: PayloadAction<number>) {
      if (action.payload < 0) action.payload = 0;
      state.count = action.payload;
    }
  }
});
```

En el caso del reducer -> resetCounter ademas de recibir el state, también vamos a tener el _action_. Este _action_ sirve para cambiar o recibir un argumento.
Por otra parte, este action va a tener el _PayloadAction_ (que tenemos que importar de redux toolkit) y el tipo de dato que espera recibir, en nuestro caso sera de tipo _number_.

```js
 resetCount(state, action: PayloadAction<number>) {
      if (action.payload < 0) action.payload = 0;
      state.count = action.payload;
    }

```

_Nota:_ la regla de oro dentro de los reducers es que se tiene que producir un nuevo state, es decir, la mutación del state debe estar basada enteramente en las acciones.

Por ultimo una vez creadas las acciones de mis reducers, las tenemos que exportar para que puedan ser utilizadas en nuestra app.

```js
export const { addOne, substractOne, resetCount } = counterSlice.actions;
```

#### Como lo utilizamos?

Nos vamos a parar sobre el archivo en el que vamos a hacer uso de nuestro counterReducer, en este caso, seria app/dashboard/counter/page.tsx

IMPORTANTE: en el componente o archivo donde utilicemos nuestro estado global si o si tiene que ser un _use client_.

Pasos para utilizarlo

1.

#### Modificación en el store

En nuestro store se recomienda tener la siguiente sintaxis dentro de nuestro reducer:

```js
export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

## DEL SERVER AL CLIENT STATE

Actualmente tenemos este problema: El component cardCounter recibe un valor inicial de 20 pero no podemos usar dentro del page nuestro _use client_ esto nos quitaría la metadata que queremos conservar.

```js
export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Counter client side"
};

export default function CounterPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <CartCounter value={20} />
    </div>
  );
}
```

La cuestión radica: _como enviamos desde el servidor algo a nuestro client state?_

1. Primera solución: aunque no es la mas viable dado que hay un pequeño momento en el que se ve el valor inicial del estado global y después se carga el valor que le estamos mandando desde el lado del servidor como asi también si modificamos el valor del count nos vuelve al valor establecido por el enviado del servidor:

```js
useEffect(() => {
  dispatch(resetCount(value));
}, [dispatch, value]);
```

Esta 'solución' mas que nada es para mostrarnos como es que cada vez que entramos en esa page el componente se vuelve a construir y es por esa razón que hace los efectos no deseados.

2. Segunda solución: modificando el _counterSlice_. En este caso agregaremos una propiedad de preparación o loading en el inicial state:

```js
interface CounterState {
  count: number;
  isReady: boolean;
}

const initialState: CounterState = {
  count: 5,
  isReady: false
};
```

Dentro del reducer, vamos a crear una nueva acción y la importamos

```js
  reducers: {

    initCounterState(state, action:PayloadAction<number>){
      if(state.isReady) return;
      state.count = action.payload;
      state.isReady = true;
    },
  }

export const
{
  initCounterState,
  addOne,
  substractOne,
  resetCount} = counterSlice.actions;
```

Por ultimo tenemos que usarla en nuestro componente *cardCounter*, utilizando el mismo useEffect() de la provisoria solución 1, en lugar de llamar al resetCount hacemos el llamado de nuestra nueva acción initCounterState().  

```js 
  useEffect(() => {
    dispatch(initCounterState(value));
  }, [dispatch, value]);

```

Esta solución si bien nos resuelve el tema de que se perdía la persistencia del cambio en el state global sigue por unos segundos apareciendo en pantalla el valor inicial y después el enviado por el servidor.

### Tarea - Store, Props y Links 

La tarea consiste en: 

1. Agregar un nuevo componente *WidgetGrid.tsx*. 
2. Utilizar el *SimpleWidget.tsx*. 
3. En *SimpleWidget.tsx* enviar por Props los elementos para dibujar de manera dinámica el contenido por props.

### RESTful Api - Get Counter

Documentación para la solución: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

Para la 3ra solución  para inicializar el contador lo que haremos sera utilizar el archivo *route.js|ts*.

El archivo _route.ts_ se utiliza para definir rutas API personalizadas, permitiendo manejar peticiones HTTP dentro del mismo entorno de la aplicación. 

IMPORTANTE : El archivo _route.ts_ no debe estar nunca en el mismo nivel que *page.ts*. 

#### Como creamos el archivo routes.ts 

Tenemos que crear la carpeta API y dentro otra carpeta en nuestro caso seria counter y dentro de ello el archivo route.ts. 

Lo hacemos de esta forma para definir al endpoint: http://localhost:3000/api/counter

```js
export async function GET(request: Request) {}

```

Nota: podemos utilizar los distintos métodos GET, POST, PUT, PATCH, DELETE etc. 
En caso de hacer una consulta a los métodos que no se enviaron el retorno es un 405 method not allowed.

Ahora tenemos que agregar la respuesta, la cual siempre se aconseja que sea un *OBJECT*:

```js 

import { NextResponse } from "next/server";

export async function GET(request: Request) {

    return NextResponse.json({
        count: 100
     })
}

```


### Valor del counter desde API - Pasos 

1. Creamos la función y la interface para hacer la consulta: 

```js 
export interface CounterResponse {
  method: string;
  count: number;
}

const getApiCounter = async (): Promise<CounterResponse> => {
  const data = await fetch("/api/counter").then((res) => res.json());
  console.log(data);
  return data
};
```
Otra forma de tipar el resultado : 

```js 
const getApiCounter = async ()=> {
  const data = await fetch("/api/counter").then((res) => res.json());
  return data as CounterResponse;
  console.log(data);
  return data
};

```

2. Utilizamos el useEffect para llamar a la función y utilizar el valor del retorno con nuestro dispatch

```js 
  useEffect(() => {
    getApiCounter().then(({count})=>dispatch(initCounterState(count)))
  }, [dispatch])

```