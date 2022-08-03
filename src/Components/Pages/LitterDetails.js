import { useEffect } from "react";
import { getLitter } from "../services/litterServices";

const LitterDetails = (params) => {
  const { id } = params;

  useEffect(() => {
    getLitter(id)
      .then(litter => {
        console.log(litter);
      });

  }, []);

  return (
    <>

    </>
  );
};

export default LitterDetails;