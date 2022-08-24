import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "../../../utils/stateContext";

const SignOut = () => {
  const { dispatch } = useGlobalState();
  const mounted = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mounted.current) {
      dispatch({
        type: "signOutUser"
      });
      navigate("/", { state: { alert: true, location: "/", severity: "success", title: "Signed Out", body: "Successfully Signed Out" } });
      mounted.current = true;
    }
  }, [mounted, dispatch, navigate]);

  return (
    <>

    </>
  );
};

export default SignOut;