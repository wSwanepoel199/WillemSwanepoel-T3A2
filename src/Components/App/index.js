import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getDogs } from '../services/dogsServices';
import { getForm } from '../services/contactServices';
import {
  // reducer
  reducer,
  init,
  // global state
  StateContext,
  // shared components
  Header,
  NavBar,
  Appbar,
  Footer,
  // pages
  Home,
  About,
  ContactForm,
  Dogs,
  DogDetails,
  NotFound,
  LitterApplication,
  SignInForm,
  SignUpForm
} from '../utils/index';
import { StyledContainer } from '../Shared/styles/index.styled';

const App = () => {
  // sets the inital state of the application
  const initialState = {
    dogList: {},
    contactFormList: {},
    loggedInUser: {},
    token: sessionStorage.getItem("token") || null
  };
  // uses reducer to globalise state.
  const [store, dispatch] = useReducer(reducer, initialState);

  // on component mount sets the inital state of the contact form and gets api from backend server
  useEffect(() => {
    getDogs()
      .then(dogs => {
        // uses reducer to spread fetched data into the global dog list state
        dispatch({
          type: "setDogList",
          data: dogs
        });
      })
      .catch(e => console.log(e));
    getForm()
      .then(form => {
        dispatch({
          type: "setFilledForms",
          data: form
        });
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      {/* makes dispatch and store availabl to the main application */}
      <StateContext.Provider value={{ store, dispatch }}>
        {console.log("list of dogs:", Object.entries(store.dogList))}
        {console.log("logged in user:", store.loggedInUser)}
        {console.log("token", store.token)}
        {console.log("list of contact attempts:", store.contactFormList)}
        <Router>
          <Header />
          <NavBar />
          <Appbar />
          <StyledContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dogs">
                <Route path=":id" element={<Dogs />} />
              </Route>
              <Route path="/dogs/chosen/:id" element={<DogDetails />} />
              <Route path="/litterApplication" element={<LitterApplication />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactForm" element={<ContactForm />} />
              <Route path="/signIn" element={<SignInForm />}></Route>
              <Route path="/signUp" element={<SignUpForm />}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StyledContainer>
          <Footer />
        </Router>
      </StateContext.Provider>
    </>
  );
};

export default App;
