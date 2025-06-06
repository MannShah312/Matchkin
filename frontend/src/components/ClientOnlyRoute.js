// utils/ClientOnlyRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "./serverHelpers";

const ClientOnlyRoute = (WrappedComponent) => {
  return function ClientProtectedComponent(props) {
    const [isValidClient, setIsValidClient] = useState(null); // null = loading

    useEffect(() => {
      const validateClient = async () => {
        try {
          const data = await makeAuthenticatedGETRequest("/clients/profile/me");
          if (data?.user?.role === "client") {
            setIsValidClient(true);
          } else {
            setIsValidClient(false);
          }
        } catch (err) {
          console.error("Client validation failed", err);
          setIsValidClient(false);
        }
      };
      validateClient();
    }, []);

    if (isValidClient === null) {
      return <p className="text-center mt-10">Verifying access...</p>;
    }

    if (isValidClient === false) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default ClientOnlyRoute;