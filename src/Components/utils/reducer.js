export const init = (initialState) => {
  return { ...initialState };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "cleanState": {
      return init();
    }
    case "setDogList": {
      // updates the dogList value
      sessionStorage.setItem("dogList", JSON.stringify(action.data));
      console.log(action.data);
      return {
        ...state,
        dogList: action.data
      };
    }
    case "setFilledForms": {
      // updates the contactFormList value
      sessionStorage.setItem("filledContactForms", JSON.stringify(action.data));
      return {
        ...state,
        contactFormList: action.data
      };
    }
    case "setLitterList": {
      // updates the litterList value
      sessionStorage.setItem("litterList", JSON.stringify(action.data));
      return {
        ...state,
        litterList: action.data
      };
    }
    case "setUserList": {
      // updates the userList value
      sessionStorage.setItem("userList", JSON.stringify(action.data));
      return {
        ...state,
        userList: action.data
      };
    }
    case "setLoggedInUser": {
      //updates the loggedInUser value
      console.log(action.data);
      return {
        ...state,
        loggedInUser: action.data
      };
    }
    case "signOutUser": {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('litterAppForms');
      return {
        ...state,
        loggedInUser: {}
      };
    }
    case "setToken": {
      //updates the token value
      return {
        ...state,
        token: action.data
      };
    }
    case "setContactForm": {
      console.log(action.data);
      return {
        ...state,
        contactForm: action.data
      };
    }
    case "setApplicationForms": {
      sessionStorage.setItem("litterAppForms", JSON.stringify(action.data));
      return {
        ...state,
        applicationForms: action.data
      };
    }
    case "updateContactForm": {
      console.log(action.data);
      return {
        ...state,
        contactForm: action.data
      };
    }
    // updates dogList by assigning new list
    case "updateDogList": {
      sessionStorage.setItem("dogList", JSON.stringify(action.data));
      return {
        ...state,
        dogList: action.data
      };
    }
    case "updateLitterList": {
      sessionStorage.setItem("litterList", JSON.stringify(action.data));
      return {
        ...state,
        litterList: action.data
      };
    }
    case "updateSpecificLitter": {
      const litterList = [...state.litterList].map(litter => [action.data].find(target => target.id === litter.id) || litter);
      return {
        ...state,
        litterList: litterList
      };
    }
    case "updateLitterApplications": {
      sessionStorage.setItem("litterAppForms", JSON.stringify(action.data));
      return {
        ...state,
        applicationForms: action.data
      };
    }
    case "mergeLitterWithBreederSireAndBitch": {
      // merges litter with referanances breeder, sire and bitch ids
      return {
        ...state,
        mergedLitterList: action.data
      };
    }
    case "updateValidBreeders": {
      // fills list of valid breeders
      return {
        ...state,
        breeders: action.data
      };
    }
    case "updateValidSires": {
      // fills list of valid sires
      return {
        ...state,
        sires: action.data
      };
    }
    case "updateValidBitches": {
      // fills list of valid bitches
      console.log(action.data);
      return {
        ...state,
        bitches: action.data
      };
    }
    case "setUpdatingApp": {
      return {
        ...state,
        updatingApp: action.data
      };
    }
    default: {
      return state;
    }
  }
};