// Import Utils
import { reducer, init } from './reducer';
import { StateProvider, useGlobalState } from './stateContext';

// Import Shared Components
import Header from '../Shared/Header';
import NavBar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import AlertComponent from '../Shared/Alert/GeneralAlert';
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
import LitterApplication from '../Pages/LittersRoute/LitterAppllicationForm/LitterApplicationForm';
import DisplayLitterApps from '../Pages/LittersRoute/LitterApplications.js/LitterApplications';
import Application from '../Pages/LittersRoute/Application/Application';
import LitterCreationForm from '../Pages/LittersRoute/LitterCreate/LitterCreate';
import LitterUpdateForm from '../Pages/LittersRoute/LitterUpdate/LitterUpdate';
import LitterManage from '../Pages/LittersRoute/LitterManage/LitterManage';
import Litter from '../Pages/LittersRoute/Litter/Litter';
import LitterDetails from '../Pages/LittersRoute/LitterDetails/LitterDetails';
import SignInForm from '../Pages/SignIn';
import SignUpForm from '../Pages/SignUp';
import SignUpRedirect from '../Pages/SignUpRedirect';
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
  AlertComponent,
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
  DisplayLitterApps,
  Application,
  LitterCreationForm,
  LitterUpdateForm,
  LitterManage,
  Litter,
  LitterDetails,
  SignInForm,
  SignUpForm,
  SignUpRedirect,
  // api
  backEndAPI,
};