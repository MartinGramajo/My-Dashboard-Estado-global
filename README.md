# My Dashboard Parte 4 - favoritos - redux middlewares - localStorage   

### Continuación de la aplicación

Siempre tenemos que tener en cuenta que la regla de oro en next es que *todo es server component*, siempre pensarlo en el árbol y donde alguna de sus hojas son *use client* o que se renderizan del lado de cliente como ser Hooks o localstorage. 

### Page Favorites - Pokemon Slice 

Creamos dentro del store : la carpeta pokemons con el archivo *pokemons.ts* en donde tenemos el pokemonsSlice y lo llamamos dentro de nuestro archivo index.ts dentro de store para poder verlo con la extension de redux en el navegador. 