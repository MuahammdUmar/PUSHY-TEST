import {
    LOGIN,
    LOGOUT,
    SIDEBAR_TOGGLE
   
  } from './actions'
  
  const global_reducer = (state, action) => {
    if(action.type === LOGIN){
      return {...state, isLoggedIn: true}
    }
    if(action.type === LOGOUT){
      return {...state, isLoggedIn: false}
    }
    if(action.type === SIDEBAR_TOGGLE){
      return {...state, isSidebarOpen: !state.isSidebarOpen}
    }
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default global_reducer
  