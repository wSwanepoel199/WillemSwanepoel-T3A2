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
import Dogs from '../Pages/Dogs';
import Dog from '../Pages/Dog';
import DogDetails from '../Pages/DogDetails';
import NotFound from '../Pages/NotFound';
import LitterApplication from '../Pages/LitterApplication';
import LoginForm from '../Pages/SignIn';

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
  Dogs,
  Dog,
  DogDetails,
  NotFound,
  LitterApplication,
  LoginForm
};