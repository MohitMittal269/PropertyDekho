import React, { createContext, useState } from 'react';
export const ThemeContext = createContext();
export const ThemeProvider= ({children})=> {
    const[count,setCount]=useState(0);
     const increase=()=>{
        setCount((prev)=>prev+1);
     }
     
     const decrease=()=>{
        setCount((prev)=>prev-1);
     }
  return (
    <ThemeContext.Provider value={{ count,setCount, increase,decrease }}>
    {children}
  </ThemeContext.Provider>
  )
}
