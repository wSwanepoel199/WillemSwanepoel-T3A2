import { createContext, useContext, useReducer } from "react";
import { reducer, init } from './index';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export const StateContext = createContext();


export const StateProvider = ({ children }) => {
  // sets the inital state of the application
  const initialState = {
    dogList: {},
    litterList: {},
    contactFormList: {},
    loggedInUser: {
      id: sessionStorage.getItem("id") || null,
      username: sessionStorage.getItem("username") || null,
      admin: sessionStorage.getItem("admin") || false,
    },
    token: sessionStorage.getItem("token") || null,
    userList: {},
  };

  // uses reducer to globalise state.
  const [store, dispatch] = useReducer(reducer, initialState, init);

  return (
    <>
      {/* provides date and time framework for use in date pickers provided by material ui. The framework chosen is Moment.js */}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StateContext.Provider value={{ store, dispatch }}>
          {children}
        </StateContext.Provider>
      </LocalizationProvider>
    </>
  );
};


export const useGlobalState = () => useContext(StateContext);