import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGlobalState } from "./stateContext";

const AdminRoute = ({ children }) => {
  const { store } = useGlobalState();
  const { loggedInUser } = store;
  const navigate = useNavigate();

  const admin = loggedInUser.admin || false;

  useEffect(() => {
    if (!admin) {
      navigate('/', { state: { alert: true, location: "/", severity: "warning", title: "Unautherised", body: "You are not autherised to access that page" } });
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
  const navigate = useNavigate();

  const user = Boolean(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate('/', { state: { alert: true, location: "/", severity: "warning", title: "Unautherised", body: "You must be signed in to access this page" } });
    }
  }, []);

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