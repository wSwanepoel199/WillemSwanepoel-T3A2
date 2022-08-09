import React, { useEffect, useReducer } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// imports required services
import { getDogs } from '../services/dogsServices';
import { getLitters } from '../services/litterServices';
import { getForms } from '../services/contactServices';
// centralises imports of reducer, global state, the shared components and pages to a single file.
import {
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
  LitterDetails,
  SignInForm,
  SignUpForm,
  SignUpRedirect,
  NotFound,
  useGlobalState,
} from '../utils/index';
// A styled material ui container which provides a top margin of 5% unless screen is larger than 955px. in which case the top margin is 25px
import { StyledContainer } from '../Shared/styles/index.styled';
// Custom Element which blocks unautherised acces to its chilren. Any unautherised access is rerouted to '/'. Only if admin is equal to true in sessionStorage will it allow access to children
import { PrivateRoute } from '../utils/PrivateRoute';
import { getUsers } from '../services/authServices';

const App = () => {
  const { store, dispatch } = useGlobalState();
  // on component mount, which is page load/reload, makes get request to backend and uses reducer to assign fetched values to store.
  useEffect(() => {
    getDogs()
      .then(dogs => {
        dispatch({
          type: "setDogList",
          data: dogs
        });
      })
      .catch(e => console.log(e));
    // getForms()
    //   .then(form => {
    //     dispatch({
    //       type: "setFilledForms",
    //       data: form
    //     });
    //   })
    //   .catch(e => console.log(e));
    // getLitters()
    //   .then(litter => {
    //     dispatch({
    //       type: "setLitterList",
    //       data: litter
    //     });
    //   })
    //   .catch(e => console.log(e));
    // getUsers()
    //   .then(users => {
    //     dispatch({
    //       type: "setUserList",
    //       data: users
    //     });
    //   })
    //   .catch(e => console.log(e));
  }, []);

  return (
    <>
      {console.log("list of dogs:", Object.entries(store.dogList))}
      {/* {console.log("list of litters:", Object.entries(store.litterList))} */}
      {/* {console.log("logged in user:", store.loggedInUser)} */}
      {/* {console.log("token", store.token)} */}
      {/* {console.log("list of contact attempts:", store.contactFormList)} */}
      {/* {console.log("user list:", store.userList)} */}
      {/* renders the header which contains the Myshalair logo*/}
      <Header data-testid="header" />
      {/* renders navbar, which is the main form of navigation */}
      <NavBar />
      <StyledContainer>
        {/* specifies the routes, the path and its associated element, the router has access to */}
        <Routes>
          {/* sets the path for the home page */}
          <Route path="/" element={<Home />} />
          {/* sets the path for about page */}
          <Route path="/about" element={<About />} />
          {/* sets the main path for dogs */}
          <Route path="/dogs" >
            {/* automatically routes path: "/dogs" to "/dogs/all" */}
            <Route index element={<Navigate to={'/dogs/all'} />} />
            {/* allows the mapped paths to be used to route the same element */}
            {['all', 'males', 'females', 'retired'].map((path, index) => {
              return (
                <Route path={`/dogs/${path}`} element={
                  <Dogs id={path} />
                } key={index} />
              );
            })}
            {/* sets the path for a selected dog using a non absolute path. in this case the router will accept any into as :id */}
            <Route path="/dogs/chosen/:id" element={<DogDetails />} />
          </Route>
          {/* sets base path for contacts*/}
          <Route path="/contacts">
            {/* sets Contacts element as base path using index. Uses PrivateRoute to manage unautherised access*/}
            <Route index element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            } />
            {/* sets path for ContactDetails using a non absolute path, will only be routed to if path hasn't been assinged to another element. element uses PrivateRoute to manage unautherised access*/}
            <Route path=":id" element={
              <PrivateRoute>
                <ContactDetails />
              </PrivateRoute>
            } />
            {/* sets path for contact form element */}
            <Route path="/contacts/form" element={<ContactForm />} />
          </Route>
          {/* sets default path for litters */}
          <Route path="/litters" >
            {/* automatically routes path: "/litters" to "/litters/apply" */}
            <Route index element={<Navigate to={'/litters/apply'} />} />
            {/* sets path for litter application page */}
            <Route path="/litters/apply" element={<LitterApplication />} />
            {/* sets path for litter management page and uses PrivateRoute to manage autherisation*/}
            <Route path="/litters/manage" element={
              <PrivateRoute>
                <LitterManage />
              </PrivateRoute>} />
            {/* sets path for litter creation page and uses PrivateRoute to manage autherisation*/}
            <Route path="/litters/create" element={
              <PrivateRoute>
                <LitterCreationForm />
              </PrivateRoute>
            } />
            {/* sets path to access LitterDetails to a non absolute path and uses PrivateRoute to manage autherisation */}
            <Route path=":id" element={
              <PrivateRoute>
                <LitterDetails />
              </PrivateRoute>} />
          </Route>
          {/* sets paths for sign in and sign up pages allowing users to make accounts and sign into them */}
          <Route path="/signIn" element={<SignInForm />}></Route>
          <Route path="/signUp" >
            <Route index element={<SignUpForm />} />
            <Route path="/signUp/confirmation" element={<SignUpRedirect />} />
          </Route>
          {/* sets path to render 404 page when attempting to access a route that does not exist */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default App;
