export const init = (initialState) => {
  return { ...initialState };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "cleanState": {
      return init(action.data);
    }
    case "setDogList": {
      return {
        dogList: action.data.results
      };
    }
    default: {
      throw new Error();
    }
  }
};