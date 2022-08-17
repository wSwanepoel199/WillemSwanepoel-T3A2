// Import Utils
import { reducer, init } from './reducer';
import { StateProvider, useGlobalState } from './stateContext';

// Import Shared Components
import Header from '../Shared/Header';
import NavBar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import AlertComponent from '../Shared/Alert/GeneralAlert';
import CustomTable from './CustomTable/CustomTable';
// Import Pages Components
import Home from '../Pages/Home';
import About from '../Pages/About';
import ContactForm from '../Pages/ContactForm';
import Contacts from '../Pages/Contacts';
import Contact from '../Pages/Contact';
import ContactDetails from '../Pages/ContactDetails';
import DogsReorder from '../Pages/DogsRoute/DogsReorder/DogsReorder';
import DogCard from '../Pages/DogsRoute/Dogcard/DogCard';
import Dog from '../Pages/DogsRoute/Dog/Dog';
import DogsManage from '../Pages/DogsRoute/DogsManage/DogsManage';
import DogCreationForm from '../Pages/DogsRoute/DogsCreate/DogsCreate';
import DogUpdateForm from '../Pages/DogsRoute/DogsUpdate/DogsUpdate';
import DogDetails from '../Pages/DogsRoute/DogDetails/DogDetails';
import NotFound from '../Pages/NotFound';
import LitterApplication from '../Pages/LittersRoute/LitterApplication/LitterApplication';
// import LitterApplicationsManage from '../Pages/LittersRoute/LitterApplicationsManage/LitterApplicationsManage';
import Litter from '../Pages/LittersRoute/Litter/Litter';
import LitterManage from '../Pages/LittersRoute/LitterManage/LitterManage';
import LitterCreationForm from '../Pages/LittersRoute/LitterCreate/LitterCreate';
import LitterUpdateForm from '../Pages/LittersRoute/LitterUpdate/LitterUpdate';
import LitterDetails from '../Pages/LittersRoute/LitterDetails/LitterDetails';
import LitterApplications from '../Pages/LittersRoute/LitterApplications/LitterApplications';
import LitterApplicationForm from '../Pages/LittersRoute/LitterAppllicationForm/LitterApplicationForm';
import LitterApplicationManage from '../Pages/LittersRoute/LitterApplicationManage/LitterApplicationManage';
import LitterApplicationDetails from '../Pages/LittersRoute/LitterApplicationDetails/LitterApplicationDetails';
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
  CustomTable,
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
  DogsReorder,
  DogCard,
  Dog,
  DogsManage,
  DogCreationForm,
  DogUpdateForm,
  DogDetails,
  NotFound,
  LitterApplication,
  // LitterApplicationsManage,
  LitterApplicationForm,
  LitterApplicationManage,
  LitterApplicationDetails,
  Litter,
  LitterManage,
  LitterCreationForm,
  LitterUpdateForm,
  LitterDetails,
  LitterApplications,
  SignInForm,
  SignUpForm,
  SignUpRedirect,
  // api
  backEndAPI,
};