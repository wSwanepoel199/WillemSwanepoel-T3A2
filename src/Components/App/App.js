import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// imports required services for dispatch
import { getDogs } from '../services/dogsServices';
import { getLitters } from '../services/litterServices';
import { getUsers } from '../services/authServices';
// centralises all majour imports into one index file
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
// Custom components which blocks unautherised acces to its chilren. Any unautherised access is rerouted to '/'. AdminRoute blocks any user which isn't an admin and SecuredRoute blocks any user that isn't signed in
import { AdminRoute, SecuredRoute } from '../utils/PrivateRouter';
// some basic styling
import { Box, Container } from '@mui/material';

// TO-DO Sprint 5
// US 1.11: impliment ability to add puppies to litter creation as to start the pedigree chain
// US 2.6 add ability for litter application to add pets and children
// US 1.12 1.21 add ability for admin to assign born puppies to specific litter applications

// to look at, display litters on a clander
// MISC GET DONE block non signed in users from accessing litter application
// Impliment allerts for successful login/logout


const App = () => {
  const { dispatch } = useGlobalState();
  const location = useLocation();
  const { state } = location;

  //   Inputs: dispatch function
  // Outputs: makes the 3 standard get requess to back end if they are not in sesssionStorage
  // Function: if not already stored, makes get requestss to back, and uses dispatch to assign response to session storage and global state
  // Used for: ensures all of the most basic info is available to be displayed to all users
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
  }, [dispatch]);



  return (
    <>
      {/* {console.log("store:", store)} */}
      {/* {console.log("list of dogs:", store.dogList)} */}
      {/* {console.log("list of litters:", store.litterList)} */}
      {/* {console.log("logged in user:", store.loggedInUser)} */}
      {/* {console.log("token", store.token)} */}
      {/* {console.log("list of contact attempts:", store.contactFormList)} */}
      {/* {console.log("user list:", store.userList)} */}

      {/* wraps whole application in a box that ensures its always the width of the window */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* renders custom alert component when location.state containes alert which is set to true */}
        {state && state.alert ?
          <>
            {/* ensures alert is rendered absolutely so it appears ontop of application */}
            <Box sx={{ width: '100%', position: 'absolute', top: 0, zIndex: '2' }}>
              {console.log("alert triggered")}
              {/* custom alert component that uses material ui's alert components to display a user friendly alert, fills fields with values passed through location.state */}
              <AlertComponent location={state.location} severity={state.severity} title={state.title} body={state.body} />
            </Box>
          </>
          :
          null}
        {/* renders the header which contains the Myshalair logo*/}
        <Header data-testid="header" />
        {/* renders navbar, which is the main form of navigation */}
        <NavBar />
        {/* Wraps main application in a container which which has a top margin of 5% if window is less than the 'md' break point or 25 if window is more */}
        <Container sx={{ mt: { xs: '5%', md: '25px' }, pb: '2.5rem' }}>
          {/* The routes component from React Routing, controls navigation throughout the application */}
          <Routes>
            {/* sets the route that renders the Home component */}
            <Route path="/" element={<Home />} />
            {/* sets the route that renders the About component */}
            <Route path="about" element={<About />} />
            {/* sets the route dogs */}
            <Route path="dogs" >
              {/* routes anyone who tries to access dogs to dogs/mange */}
              <Route index element={<Navigate to={'manage'} replace={true} />} />
              {/* sets the route that renders the DogsManage component */}
              <Route path="manage" element={
                <AdminRoute>
                  <DogsManage />
                </AdminRoute>
              } />
              {/* sets the route that renders DogCreationForm component */}
              <Route path="create" element={
                <AdminRoute>
                  <DogCreationForm />
                </AdminRoute>} />
              {/* sets the route that renders DogUpdateForm component */}
              <Route path=":id/edit" element={
                <AdminRoute>
                  <DogUpdateForm />
                </AdminRoute>} />
              {/* sets the route that renders the DisplayDogs component with a id prop of all */}
              <Route path="display/all" element={
                <AdminRoute>
                  <DisplayDogs id={'all'} />
                </AdminRoute>} />
              {/* sets the route that renders the DogsReorder componet */}
              <Route path="re_order" element={
                <AdminRoute>
                  <DogsReorder />
                </AdminRoute>
              } />
              {/* maps the 3 values to the route that renders the DisplayDogs component, used for showing filtered lists to public */}
              {['male', 'female', 'retired'].map((path, index) => {
                return (
                  <Route path={`display/${path}`} element={
                    // <DogsReorder id={path} />
                    <DisplayDogs id={path} />
                  } key={index} />
                );
              })}
              {/* sets the route that renders DogDetails component, uses :id param to control which dog is providing details */}
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


//   Inputs: what args does the function take and what type are each of them.
// Outputs: what are the names of the things the function might return, what type are they, what conditions lead to one return or another.
// Function: what does the function do with the inputs to turn them into the outputs, the control flow and the functions
// Called by: list all functions that call this function
// Used for: what feature(s) does this support at the userspace level