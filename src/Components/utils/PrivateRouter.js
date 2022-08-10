import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useGlobalState } from "./stateContext";

const AdminRoute = ({ children }) => {
  const { store } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();

  const admin = loggedInUser.admin || false;

  const [blockedRoute, setBlockedRoute] = useState(false);

  useEffect(() => {
    if (!admin) {
      navigate('/', { state: { alert: true, severity: "warning", title: "Unautherised", body: "You are not autherised to access that page" } });
    }
  }, []);

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
  const { store } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();
  const location = useLocation();

  const user = loggedInUser.id || null;

  const AlertUnauthedAccess = () => {
    return (
      <Alert severity="warning">
        <AlertTitle>
          Unautherised
        </AlertTitle>
        You are not autherised to access that page
      </Alert>
    );
  };

  if (user) {
    return (
      <>
        {children}
      </>
    );
  } else {
    return navigate('/', { state: { alert: true, severity: "warning", title: "Unautherised", body: "You are not autherised to access that page" } });
  }
};


export { AdminRoute, SecuredRoute };