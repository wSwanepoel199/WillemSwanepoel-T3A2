import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import {
  // reducer
  reducer,
  init,
  // global state
  StateContext,
  // shared components
  Header,
  NavBar,
  Footer,
  // pages
  Home,
  About,
  ContactForm,
  Dogs,
  DogDetails,
  NotFound,
  LitterApplication
} from '../utils/index';

const App = () => {
  // sets the inital state of the application
  const initialState = {
    dogList: {},
    contactForm: {}
  };
  // uses reducer to globalise state.
  const [store, dispatch] = useReducer(reducer, initialState, init);

  // on component mount sets the inital state of the contact form and gets api from backend server
  useEffect(() => {
    const initialContactFormState = {
      email: "",
      catagory: "",
      details: ""
    };
    axios.get("http://127.0.0.1:3001/dogs")
      .then(response => {
        // uses reducer to spread fetched data into the global dog list state
        dispatch({
          type: "setDogList",
          data: response.data
        });
        // uses reducer to spread intial contact form state into global contact form state
        dispatch({
          type: "setContactForm",
          data: initialContactFormState
        });
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      {/* makes dispatch and store availabl to the main application */}
      <StateContext.Provider value={{ store, dispatch }}>
        {console.log(Object.entries(store.dogList))}
        <Router>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dogs">
              <Route path=":id" element={<Dogs />} />
            </Route>
            <Route path="/dogs/chosen/:id" element={<DogDetails />} />
            <Route path="/litterApplication" element={<LitterApplication />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactForm" element={<ContactForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </StateContext.Provider>
    </>
  );
};

export default App;
