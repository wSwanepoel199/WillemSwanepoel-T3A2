import React, { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { getDogs } from '../services/dogsServices';
import { getLitters } from '../services/litterServices';
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
  LitterApplication,
  LitterCreationForm,
  LitterManage,
  SignInForm,
  SignUpForm,
  NotFound,
} from '../utils/index';
import { StyledContainer } from '../Shared/styles/index.styled';
import { PrivateRoute } from '../utils/PrivateRoute';

const App = () => {
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
    getLitters()
      .then(litter => {
        console.log("Litters:", litter);
        dispatch({
          type: "setLitterList",
          data: litter
        });
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {/* makes dispatch and store available to the application */}
        <StateContext.Provider value={{ store, dispatch }}>
          {console.log("list of dogs:", Object.entries(store.dogList))}
          {console.log("list of litters:", Object.entries(store.litterList))}
          {console.log("logged in user:", store.loggedInUser)}
          {console.log("token", store.token)}
          {console.log("list of contact attempts:", store.contactFormList)}
          {console.log("user list:", store.userList)}
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
                {/* sets route for about page */}
                <Route path="/about" element={<About />} />
                {/* sets the route for dogs using params to specify the type of dog */}
                <Route path="/dogs">
                  <Route path=":id" element={<Dogs />} />
                  {/* sets the route for a selected dog using params to choose which dog had been selected */}
                  <Route path="/dogs/chosen/:id" element={<DogDetails />} />
                </Route>
                {/* sets base route for contacts*/}
                <Route path="/contacts">
                  {/* sets Contacts page as default route and wraps in custom route to ensure only accessable by admin*/}
                  <Route index element={
                    <PrivateRoute>
                      <Contacts />
                    </PrivateRoute>
                  } />
                  {/* sets route for ContactDetails page and wraps in custom route to ensure only accessable by admin*/}
                  <Route path=":id" element={
                    <PrivateRoute>
                      <ContactDetails />
                    </PrivateRoute>
                  } />
                  {/* sets route for contact form page */}
                  <Route path="/contacts/form" element={<ContactForm />} />
                </Route>
                {/* sets default route for litters */}
                <Route path="/litters" >
                  {/* sets route for litter application page */}
                  <Route path="/litters/apply" element={<LitterApplication />} />
                  {/* sets route for litter management page and wraps in custom route to ensure only accessable by admin*/}
                  <Route path="/litters/manage" element={
                    <PrivateRoute>
                      <LitterManage />
                    </PrivateRoute>} />
                  {/* sets route for litter creation page and wraps in custom route to ensure only accessable by admin*/}
                  <Route path="/litters/create" element={
                    <PrivateRoute>
                      <LitterCreationForm />
                    </PrivateRoute>
                  } />
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
      </LocalizationProvider>
    </>
  );
};

export default App;
