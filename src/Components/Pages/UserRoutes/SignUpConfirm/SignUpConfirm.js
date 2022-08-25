import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getConfirm, signIn } from "../../../services/authServices";

const SignUpConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = useState([]);

  useEffect(() => {
    if (confirmation.length === 0) {
      setConfirmation(location.search);
    }
  }, [location]);

  useEffect(() => {
    if (confirmation.length !== 0) {
      getConfirm(confirmation)
        .then(reply => {
          console.log(reply);
          if (reply.status === 200) {
            navigate('/user/signin', { state: { alert: true, location: '/user/signin', severity: 'success', title: 'Account Confirmed', body: 'Your account has been confirmed and you are able to sign in with it' } });
          }
        })
        .catch(e => {
          console.log(e);
          navigate('/', { state: { alert: true, location: '/', severity: 'error', title: 'Unknown Error', body: 'Something went wrong and your account could not be confirmed' } });
        });
    }
  }, [confirmation]);

  return (
    <>
      {console.log(confirmation)}
    </>
  );
};

export default SignUpConfirm;