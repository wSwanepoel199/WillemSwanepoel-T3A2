import { useEffect } from "react";
import { Outlet } from "react-router";
import { getDogs } from "../../services/dogsServices";
import { getLitters } from "../../services/litterServices";
import { useGlobalState } from "../../utils/stateContext";

const DogIndex = () => {
  const { dispatch } = useGlobalState();

  useEffect(() => {
    // getDogs()
    //   .then(reply => {
    //     dispatch({
    //       type: "setDogList",
    //       data: reply
    //     });
    //   })
    //   .catch(e => console.log(e));
    getLitters()
      .then(reply => {
        dispatch({
          type: "setLitterList",
          data: reply
        });
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default DogIndex;