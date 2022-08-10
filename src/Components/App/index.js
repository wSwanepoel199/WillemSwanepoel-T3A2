import React, { useEffect, useMemo } from 'react';
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
import { AdminRoute, SecuredRoute } from '../utils/PrivateRouter';
import { Alert, AlertTitle, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const App = () => {
  const { store, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    navigate("."); // <-- redirect to current path w/o state
  };

  useEffect(() => {
    let timer1;
    if (state && state.alert) {
      setOpen(true);
      timer1 = setTimeout(() => {
        handleClose();
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
    if (store.dogList) {
      console.log("there is a doglist");
      getDogs()
        .then(dogs => {
          dispatch({
            type: "setDogList",
            data: dogs
          });
        })
        .catch(e => console.log(e));
    }

    getLitters()
      .then(litter => {
        dispatch({
          type: "setLitterList",
          data: litter
        });
      })
      .catch(e => console.log(e));
    getUsers()
      .then(users => {
        dispatch({
          type: "setUserList",
          data: users
        });
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      {console.log("list of dogs:", Object.entries(store.dogList))}
      {/* {console.log("list of litters:", Object.entries(store.litterList))} */}
      {/* {console.log("logged in user:", store.loggedInUser)} */}
      {/* {console.log("token", store.token)} */}
      {/* {console.log("list of contact attempts:", store.contactFormList)} */}
      {/* {console.log("user list:", store.userList)} */}
      {console.log(location)}
      {state && state.alert ?
        <Collapse in={open}>
          <Alert
            severity={state.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <AlertTitle>
              {state.title}
            </AlertTitle>
            {state.body}
          </Alert>
        </Collapse>
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
            <Route index element={<Navigate to={'/litters/apply'} />} />
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
