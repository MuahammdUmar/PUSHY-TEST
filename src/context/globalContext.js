import React, { useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'
import { LOGIN, LOGOUT, SIDEBAR_TOGGLE } from './actions'

const initialState = {
  isSidebarOpen: false,
  isLoggedIn: false
}

const globalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)
  
  const setLogin = () => {
    dispatch({ type: LOGIN })
  }
  const setLogout = () => {
    dispatch({ type: LOGOUT })
  }
  const toggleSideBar = () => {
    dispatch({ type: SIDEBAR_TOGGLE})
  }
  return (
    <globalContext.Provider value={{...state, setLogin, setLogout, toggleSideBar}}>
      {children}
    </globalContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(globalContext)
}
