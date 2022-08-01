import { useGlobalState } from "../utils";

const SignOut = () => {
  const { dispatch, init } = useGlobalState();

  dispatch({
    type: "clearState",
    data: init
  });
  sessionStorage.clear();

};

export default SignOut;