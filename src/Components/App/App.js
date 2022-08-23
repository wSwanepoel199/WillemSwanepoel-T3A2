import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// imports required services
import { getDogs } from '../services/dogsServices';
import { getLitters } from '../services/litterServices';
import { getUsers } from '../services/authServices';
// centralises imports of reducer, global state, the shared components and pages to a single file.
import {
  // shared components
  Header,
  NavBar,
  AlertComponent,
  // pages
  Home,
  About,
  DogsManage,
  DogCreationForm,
  DogUpdateForm,
  DogsReorder,
  DogDetails,
  DisplayDogs,
  // LitterApplicationsManage,
  LitterApplicationForm,
  LitterApplicationManage,
  LitterApplicationDetails,
  LitterManage,
  LitterCreationForm,
  LitterUpdateForm,
  LitterDetails,
  LitterApplications,
  SignInForm,
  SignUpForm,
  SignUpRedirect,
  NotFound,
  // state
  useGlobalState,
  SignOut,
  ProfileView,
  ShowCase,
} from '../utils/componentIndex';
// Custom Element which blocks unautherised acces to its chilren. Any unautherised access is rerouted to '/'. Only if admin is equal to true in sessionStorage will it allow access to children
import { AdminRoute, SecuredRoute } from '../utils/PrivateRouter';
import { Box, Container } from '@mui/material';

// TO-DO Sprint 5
// US 1.11: impliment ability to add puppies to litter creation as to start the pedigree chain
// US 2.6 add ability for litter application to add pets and children
// US 1.12 1.21 add ability for admin to assign born puppies to specific litter applications

// to look at, display litters on a clander
// MISC GET DONE block non signed in users from accessing litter application
// Impliment allerts for successful login/logout


const App = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  const location = useLocation();
  const { state } = location;

  // on component mount, which is page load/reload, makes get request to backend and uses reducer to assign fetched values to store.
  useEffect(() => {
    if (sessionStorage.getItem("dogList") === null) {
      getDogs()
        .then(dogs => {
          dispatch({
            type: "setDogList",
            data: dogs
          });
        })
        .catch(e => console.log(e));
    }
    if (sessionStorage.getItem("litterList") === null) {
      getLitters()
        .then(litter => {
          dispatch({
            type: "setLitterList",
            data: litter
          });
        })
        .catch(e => console.log(e));
    }
    if (sessionStorage.getItem("userList") === null) {
      getUsers()
        .then(users => {
          dispatch({
            type: "setUserList",
            data: users
          });
        })
        .catch(e => console.log(e));
    }
    // if (sessionStorage.getItem("litterAppForms") === null && loggedInUser.admin === true) {
    //   getLitterApps()
    //     .then(apps => {
    //       dispatch({
    //         type: 'setApplicationForms',
    //         data: apps
    //       });
    //     })
    //     .catch((e) => console.log(e));
    // }
  }, [dispatch, loggedInUser]);

  return (
    <>
      {console.log("store:", store)}
      {console.log("list of dogs:", store.dogList)}
      {console.log("list of litters:", store.litterList)}
      {/* {console.log("logged in user:", store.loggedInUser)} */}
      {/* {console.log("token", store.token)} */}
      {/* {console.log("list of contact attempts:", store.contactFormList)} */}
      {/* {console.log("user list:", store.userList)} */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* renders an alert with customisable fields depending on requirement */}
        {state && state.alert ?
          <Box sx={{ width: '100%', position: 'absolute', top: 0, zIndex: '2' }}>
            {console.log("alert triggered")}
            <AlertComponent location={state.location} severity={state.severity} title={state.title} body={state.body} />
          </Box>
          :
          null}
        {/* renders the header which contains the Myshalair logo*/}
        <Header data-testid="header" />
        {/* renders navbar, which is the main form of navigation */}
        <NavBar />
        {/* A styled material ui container which provides a top margin of 5% unless screen is larger than 955px. in which case the top margin is 25px */}
        <Container sx={{ mt: { xs: '5%', md: '25px' }, pb: '2.5rem' }}>
          {/* specifies the routes, the path and its associated element, the router has access to */}
          <Routes>
            {/* sets the path for the home page */}
            <Route path="/" element={<Home />} />
            {/* sets the path for about page */}
            <Route path="about" element={<About />} />
            {/* sets the main path for dogs */}
            <Route path="dogs" >
              {/* automatically routes path: "/dogs" to "/dogs/manage" */}
              <Route index element={<Navigate to={'manage'} replace={true} />} />
              <Route path="manage" element={
                <AdminRoute>
                  <DogsManage />
                </AdminRoute>
              } />
              <Route path="create" element={
                <AdminRoute>
                  <DogCreationForm />
                </AdminRoute>} />
              <Route path=":id/edit" element={
                <AdminRoute>
                  <DogUpdateForm />
                </AdminRoute>} />
              <Route path="display/all" element={
                <AdminRoute>
                  <DisplayDogs id={'all'} />
                </AdminRoute>} />
              <Route path="re_order" element={
                <AdminRoute>
                  <DogsReorder />
                </AdminRoute>
              } />
              {/* allows the mapped paths to be used to route the same element */}
              {['male', 'female', 'retired'].map((path, index) => {
                return (
                  <Route path={`display/${path}`} element={
                    // <DogsReorder id={path} />
                    <DisplayDogs id={path} />
                  } key={index} />
                );
              })}
              {/* sets the path for a selected dog using a non absolute path. in this case the router will accept any into as :id */}
              <Route path="display/:id" element={<DogDetails />} />
            </Route>
            {/* sets default path for litters */}
            <Route path="litters" >
              {/* automatically routes path: "/litters" to "/litters/apply" */}
              <Route index element={<Navigate to={'/litters/manage'} replace={true} />} />
              {/* sets path for litter management page and uses AdminRoute to manage autherisation*/}
              <Route path="manage" element={
                <AdminRoute>
                  <LitterManage />
                </AdminRoute>} />
              {/* sets path for litter creation page and uses AdminRoute to manage autherisation*/}
              <Route path="create" element={
                <AdminRoute>
                  <LitterCreationForm />
                </AdminRoute>
              } />
              {/* sets path for litter application page */}
              <Route path="apply" element={
                <SecuredRoute>
                  <LitterApplicationForm />
                </SecuredRoute>} />
              <Route path="applications" element={
                <AdminRoute>
                  <LitterApplicationManage />
                </AdminRoute>
              } />
              <Route path="showcase" element={<ShowCase />} />
              {/* sets path to access LitterDetails to a non absolute path */}
              <Route path=":id" element={
                <LitterDetails />
              } />
              {/* sets path for litter update page and uses AdminRoute to manage autherisation*/}
              <Route path=":id/edit" element={
                <AdminRoute>
                  <LitterUpdateForm />
                </AdminRoute>
              } />
              {/* sets default path for the litter applications */}
              <Route path=":id/applications">
                {/* sets path for litter applications manafement page and uses AdminRoute to manage autherisation */}
                {/* <Route path="manage" element={
                <AdminRoute>
                  <LitterApplicationsManage />
                </AdminRoute>
              } /> */}
                <Route index element={
                  <AdminRoute>
                    <LitterApplications />
                  </AdminRoute>
                } />
                <Route path=":id" element={
                  <AdminRoute>
                    <LitterApplicationDetails />
                  </AdminRoute>
                } />
                <Route path=":id/manage" element={
                  <AdminRoute>
                    <LitterApplicationManage />
                  </AdminRoute>
                } />
              </Route>
            </Route>

            {/* sets paths for sign in and sign up pages allowing users to make accounts and sign into them */}
            <Route path='user'>
              <Route path=":id" element={
                <SecuredRoute>
                  <ProfileView />
                </SecuredRoute>
              } />
              <Route path="signIn" element={<SignInForm />} />
              <Route path="signUp" >
                <Route index element={<SignUpForm />} />
                <Route path="confirmation" element={<SignUpRedirect />} />
              </Route>
              <Route path="signOut" element={
                <SecuredRoute>
                  <SignOut />
                </SecuredRoute>
              } />
            </Route>
            {/* sets path to render 404 page when attempting to access a route that does not exist */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
};

export default App;
