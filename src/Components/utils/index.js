// Import Utils
import { reducer, init } from './reducer';
import { StateProvider, useGlobalState } from './stateContext';

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
import LitterApplication from '../Pages/LittersRoute/LitterAppllication/LitterApplication';
import LitterCreationForm from '../Pages/LittersRoute/LitterCreate/LitterCreate';
import LitterUpdateForm from '../Pages/LittersRoute/LitterUpdate/LitterUpdate';
import LitterManage from '../Pages/LittersRoute/LitterManage/LitterManage';
import Litter from '../Pages/LittersRoute/Litter/Litter';
import LitterDetails from '../Pages/LittersRoute/LitterDetails/LitterDetails';
import SignInForm from '../Pages/SignIn';
import SignUpForm from '../Pages/SignUp';
import SignUpRedirect from '../Pages/SignUpRedirect';
import SignOut from '../Pages/SignOut';
// API
import backEndAPI from './api';

// Export Components
export {
  // Utils
  reducer,
  init,
  StateProvider,
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
  LitterUpdateForm,
  LitterManage,
  Litter,
  LitterDetails,
  SignInForm,
  SignUpForm,
  SignUpRedirect,
  SignOut,
  // helpers
  reorder,
  // api
  backEndAPI,
};

const reorder = (item, startIndex, endIndex) => {
  const result = Array.from(item);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};