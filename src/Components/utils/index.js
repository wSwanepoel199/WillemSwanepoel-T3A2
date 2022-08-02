// Import Utils
import { reducer, init } from './reducer';
import { StateContext, useGlobalState } from './stateContext';

// Import Shared Components
import Header from '../Shared/Header';
import NavBar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
// Import Pages Components
import Home from '../Pages/Home';
import About from '../Pages/About';
import ContactForm from '../Pages/ContactForm';
import Contacts from '../Pages/Contacts';
import Contact from '../Pages/Contact';
import ContactDetails from '../Pages/ContactDetails';
import Dogs from '../Pages/Dogs';
import Dog from '../Pages/Dog';
import DogDetails from '../Pages/DogDetails';
import NotFound from '../Pages/NotFound';
import LitterApplication from '../Pages/LitterApplication';
import LitterCreationForm from '../Pages/LitterCreate';
import LitterManage from '../Pages/LitterManage';
import Litter from '../Pages/Litter';
import LitterDetails from '../Pages/LitterDetails';
import SignInForm from '../Pages/SignIn';
import SignUpForm from '../Pages/SignUp';
import SignOut from '../Pages/SignOut';
// API
import backEndAPI from './api';

// Export Components
export {
  // Utils
  reducer,
  init,
  StateContext,
  useGlobalState,
  // Shared Components
  Header,
  NavBar,
  Footer,
  // Pages
  Home,
  About,
  ContactForm,
  Contacts,
  Contact,
  ContactDetails,
  Dogs,
  Dog,
  DogDetails,
  NotFound,
  LitterApplication,
  LitterCreationForm,
  LitterManage,
  Litter,
  LitterDetails,
  SignInForm,
  SignUpForm,
  SignOut,
  // API,
  backEndAPI,
};