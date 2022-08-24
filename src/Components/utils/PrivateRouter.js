import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "./stateContext";

const AdminRoute = ({ children }) => {
  const { store } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();

  const admin = loggedInUser.admin || false;

  useEffect(() => {
    if (!admin) {
      navigate('/', { state: { alert: true, location: "/", severity: "warning", title: "Unauthorised", body: "You are not autherised to access that page" } });
    }
  }, [admin, navigate]);

  return (
    <>
      {admin ?
        <>
          {children}
        </>
        :
        <>

        </>
      }
    </>
  );
};

const SecuredRoute = ({ children }) => {
  const navigate = useNavigate();

  const user = Boolean(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate('/', { state: { alert: true, location: "/", severity: "warning", title: "Unauthorised", body: "You must be signed in to access this page" } });
    }
  }, [user, navigate]);

  return (
    <>
      {user ?
        <>
          {children}
        </>
        :
        <>

        </>
      }
    </>
  );
};


export { AdminRoute, SecuredRoute };