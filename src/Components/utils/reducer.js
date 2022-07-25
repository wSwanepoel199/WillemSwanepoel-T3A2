export const init = (initialState) => {
  return { ...initialState };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "cleanState": {
      return init(action.data);
    }
    case "setDogList": {
      console.log(action.data);
      return {
        dogList: action.data
      };
    }
    case "setContactForm": {
      console.log(action.data);
      return {
        ...state,
        contactForm: action.data
      };
    }
    case "updateContactForm": {
      console.log(action.data);
      return {
        ...state,
        contactForm: action.data
      };
    }
    default: {
      throw new Error();
    }
  }
};