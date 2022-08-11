import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// imports required services
import { getDogs } from '../services/dogsServices';
import { getLitters } from '../services/litterServices';
import { getUsers } from '../services/authServices';
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
  LitterUpdateForm,
  LitterManage,
  LitterDetails,
  SignInForm,
  SignUpForm,
  SignUpRedirect,
  NotFound,
  useGlobalState,
} from '../utils/componentIndex';
// A styled material ui container which provides a top margin of 5% unless screen is larger than 955px. in which case the top margin is 25px
import { StyledContainer } from '../Shared/styles/index.styled';
// Custom Element which blocks unautherised acces to its chilren. Any unautherised access is rerouted to '/'. Only if admin is equal to true in sessionStorage will it allow access to children
import { AdminRoute, SecuredRoute } from '../utils/PrivateRouter';
import { Alert, AlertTitle, IconButton, Collapse, Container, Box } from '@mui/material';
import { positions } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

// TO-DO Sprint 5
// US 1.11: impliment ability to add puppies to litter creation as to start the pedigree chain
// US 2.6 add ability for litter application to add pets and children
// US 1.12 1.21 add ability for admin to assign born puppies to specific litter applications

// to look at, display litters on a clander
// MISC GET DONE block non signed in users from accessing litter application


const App = () => {
  const { store, dispatch } = useGlobalState();
  const { dogList, litterList, userList } = store;
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [open, setOpen] = useState(false);
  const handleEnd = () => {
    navigate("."); // <-- redirect to current path w/o state
  };

  useEffect(() => {
    let timer1;
    if (state && state.alert) {
      setOpen(true);
      timer1 = setTimeout(() => {
        setOpen(false);
      },
        5000
      );
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [state]);

  // on component mount, which is page load/reload, makes get request to backend and uses reducer to assign fetched values to store.
  useEffect(() => {
    if (dogList) {
      getDogs()
        .then(dogs => {
          dispatch({
            type: "setDogList",
            data: dogs
          });
        })
        .catch(e => console.log(e));
    }
    if (litterList) {
      getLitters()
        .then(litter => {
          dispatch({
            type: "setLitterList",
            data: litter
          });
        })
        .catch(e => console.log(e));
    }
    if (userList) {
      getUsers()
        .then(users => {
          dispatch({
            type: "setUserList",
            data: users
          });
        })
        .catch(e => console.log(e));
    }
  }, []);

  useEffect(() => {
    updateLitters();
    updateValidBreeders();
    updateValidSires();
    updateValidBitches();
  }, [userList, litterList, dogList]);

  const updateLitters = () => {
    dispatch({
      type: "mergeLitterWithBreederSireAndBitch",
      data: Object.values(litterList).map((litter) => {
        const breeder = Object.values(userList).find(breeder => breeder.id === litter.breeder_id);
        const sire = Object.values(dogList).find(sire => sire.id === litter.sire_id);
        const bitch = Object.values(dogList).find(bitch => bitch.id === litter.bitch_id);
        return {
          ...litter,
          breeder,
          sire,
          bitch
        };
      })
    });
  };

  const updateValidBreeders = () => {
    dispatch({
      type: "updateValidBreeders",
      data: Object.values(userList).filter(user => user),
    });
  };
  const updateValidSires = () => {
    dispatch({
      type: "updateValidSires",
      data: Object.values(dogList).filter(dog => dog.sex === 1),
    });
  };
  const updateValidBitches = () => {
    dispatch({
      type: "updateValidBitches",
      data: Object.values(dogList).filter(dog => dog.sex === 2),
    });
  };

  return (
    <>
      {console.log("store:", store)}
      {console.log("list of dogs:", Object.entries(store.dogList))}
      {console.log("list of litters:", Object.entries(store.litterList))}
      {/* {console.log("logged in user:", store.loggedInUser)} */}
      {/* {console.log("token", store.token)} */}
      {/* {console.log("list of contact attempts:", store.contactFormList)} */}
      {/* {console.log("user list:", store.userList)} */}
      {/* renders an alert with customisable fields depending on requirement */}
      {state && state.alert ?
        <Box sx={{ width: '100%', position: 'absolute', zIndex: '2' }}>
          <Collapse
            in={open}
            onExited={() => { handleEnd(); }}
          >
            <Alert
              severity={state.severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => { setOpen(false); }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{
                mb: 2,
              }}
            >
              <AlertTitle>
                {state.title}
              </AlertTitle>
              {state.body}
            </Alert>
          </Collapse>
        </Box>
        :
        null}
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
            <Route index element={<Navigate to={'/dogs/all'} replace={true} />} />
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
            {/* sets Contacts element as base path using index. Uses AdminRoute to manage unautherised access*/}
            <Route index element={
              <AdminRoute>
                <Contacts />
              </AdminRoute>
            } />
            {/* sets path for ContactDetails using a non absolute path, will only be routed to if path hasn't been assinged to another element. element uses AdminRoute to manage unautherised access*/}
            <Route path=":id" element={
              <AdminRoute>
                <ContactDetails />
              </AdminRoute>
            } />
            {/* sets path for contact form element */}
            <Route path="/contacts/form" element={<ContactForm />} />
          </Route>
          {/* sets default path for litters */}
          <Route path="/litters" >
            {/* automatically routes path: "/litters" to "/litters/apply" */}
            <Route index element={<Navigate to={'/litters/manage'} />} />
            {/* sets path for litter application page */}
            <Route path="/litters/apply" element={<LitterApplication />} />
            {/* sets path for litter management page and uses AdminRoute to manage autherisation*/}
            <Route path="/litters/manage" element={
              <AdminRoute>
                <LitterManage />
              </AdminRoute>} />
            {/* sets path for litter creation page and uses AdminRoute to manage autherisation*/}
            <Route path="/litters/create" element={
              <AdminRoute>
                <LitterCreationForm />
              </AdminRoute>
            } />
            {/* sets path for litter update page and uses AdminRoute to manage autherisation*/}
            <Route path="/litters/:id/edit" element={
              <AdminRoute>
                <LitterUpdateForm />
              </AdminRoute>
            } />
            {/* sets path to access LitterDetails to a non absolute path and uses AdminRoute to manage autherisation */}
            <Route path=":id" element={
              <AdminRoute>
                <LitterDetails />
              </AdminRoute>} />
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
