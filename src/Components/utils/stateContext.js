import { createContext, useContext, useReducer } from "react";
import { reducer, init } from './componentIndex';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export const StateContext = createContext();


export const StateProvider = ({ children }) => {
  // sets the inital state of the application
  const initialState = {
    dogList: JSON.parse(sessionStorage.getItem("dogList")) || {},
    litterList: JSON.parse(sessionStorage.getItem("litterList")) || {},
    contactFormList: JSON.parse(sessionStorage.getItem("filledContactForms")) || {},
    loggedInUser: JSON.parse(sessionStorage.getItem("user")) || {},
    token: sessionStorage.getItem("token") || null,
    userList: JSON.parse(sessionStorage.getItem("userList")) || {},
    mergedLitterList: {},
    breeders: {},
    sires: {},
    bitches: {},
    applicationForms: JSON.parse(sessionStorage.getItem("litterAppForms")) || {},
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