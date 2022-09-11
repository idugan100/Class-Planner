

import { createContext,useEffect,useReducer } from "react";

export const AuthContext=createContext();
export const authReducer=(state,action)=>{
    console.log(action.type)
    switch(action.type){
        case 'LOGIN':
            return{...state,isAuth:true}
        case 'LOGOUT':
            return {...state,isAuth:false}
        default:
            return state
    }

}

export const AuthContextProvider=({children})=>{
    
    const[state,dispatch]=useReducer(authReducer,{
        
        isAuth:false
    });
    
    
    return(<AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider>)
}