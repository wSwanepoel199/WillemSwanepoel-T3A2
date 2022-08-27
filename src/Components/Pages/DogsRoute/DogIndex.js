import { useEffect } from "react";
import { Outlet } from "react-router";
import { getLitters } from "../../services/litterServices";
import { useGlobalState } from "../../utils/stateContext";

const DogIndex = () => {
  const { dispatch } = useGlobalState();

  useEffect(() => {
    getLitters()
      .then(reply => {
        dispatch({
          type: "setLitterList",
          data: reply
        });
      })
      .catch(e => console.log(e));
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default DogIndex;