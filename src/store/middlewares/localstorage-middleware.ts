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