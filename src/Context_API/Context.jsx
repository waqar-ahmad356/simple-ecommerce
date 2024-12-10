import React, { createContext } from 'react'


export const ContextApi=createContext();

const Context = ({children}) => {

  const apiUrl="https://ae76-203-99-174-147.ngrok-free.app";
  return (
    <ContextApi.Provider value={{apiUrl}}>
      {children}
    </ContextApi.Provider>
  )
}

export default Context
