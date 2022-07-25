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
import { Container } from 'react-bootstrap';

const App = () => {
  const initialState = {
    dogList: {}
  };

  const [store, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0/")
      .then(response => {
        console.log(response);
        dispatch({
          type: 'setDogList',
          data: response.data
        });
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <StateContext.Provider value={{ store, dispatch }}>
        {console.log(Object.keys(store.dogList))}
        <Router>
          <Header />
          <NavBar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/dogs">
                <Route index element={<Dogs />} />
                <Route path=":id" element={<DogDetails />} />
              </Route>
              <Route path="/litterApplication" element={<LitterApplication />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactForm" element={<ContactForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </StateContext.Provider>
    </>
  );
};

export default App;
