import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getDogs } from '../services/dogsServices';
import { getForms } from '../services/contactServices';
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
  Contacts,
  ContactDetails,
  Dogs,
  DogDetails,
  NotFound,
  LitterApplication,
  SignInForm,
  SignUpForm,
} from '../utils/index';
import { StyledContainer } from '../Shared/styles/index.styled';

const App = () => {
  // sets the inital state of the application
  const initialState = {
    dogList: {},
    contactFormList: {},
    loggedInUser: {
      id: sessionStorage.getItem("id") || null,
      username: sessionStorage.getItem("username") || null,
      admin: sessionStorage.getItem("admin") || false,
    },
    token: sessionStorage.getItem("token") || null,
  };
  // uses reducer to globalise state.
  const [store, dispatch] = useReducer(reducer, initialState, init);

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
    getForms()
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
      {/* makes dispatch and store available to the application */}
      <StateContext.Provider value={{ store, dispatch }}>
        {console.log("list of dogs:", Object.entries(store.dogList))}
        {console.log("logged in user:", store.loggedInUser)}
        {console.log("token", store.token)}
        {console.log("list of contact attempts:", store.contactFormList)}
        <Router>
          {/* renders the header which contains the Myshalair logo*/}
          <Header />
          {/* renders navbar, which is the main form of navigation */}
          <NavBar />
          {/* wraps rest of application in a container */}
          <StyledContainer>
            <Routes>
              {/* sets the route for the home page */}
              <Route path="/" element={<Home />} />
              {/* sets the route for dogs using params to specify the type of dog */}
              <Route path="/dogs">
                <Route path=":id" element={<Dogs />} />
              </Route>
              {/* sets the route for a selected dog using params to choose which dog had been selected */}
              <Route path="/dogs/chosen/:id" element={<DogDetails />} />
              {/* sets route for litter application */}
              <Route path="/litterApplication" element={<LitterApplication />} />
              {/* sets route for about page */}
              <Route path="/about" element={<About />} />
              {/* sets route for contact form page */}
              <Route path="/contactForm" element={<ContactForm />} />
              {/* sets routes for contacts, which lists all sent contact forms and contactdetails, which uses params to select the form and views it in greater detail */}
              <Route path="/contacts">
                <Route index element={<Contacts />} />
                <Route path=":id" element={<ContactDetails />} />
              </Route>
              {/* sets routes for sign in and sign up allowing users to make accounts and sign into them */}
              <Route path="/signIn" element={<SignInForm />}></Route>
              <Route path="/signUp" element={<SignUpForm />}></Route>
              {/* default path to render 404 page when attempting to access a route that does not exist */}
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
