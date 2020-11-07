import React from "react";
import { Route, Navigate } from "react-router-dom";

type Props = {
  element: React.ReactElement;
  path: string;
};

const ProtectedRoute: React.FC<Props> = ({ element, path, children }) => {
  const isAuthenticated = true; // TODO: handle auth

  return isAuthenticated ? (
    <Route path={path} element={element}>
      {children}
    </Route>
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default ProtectedRoute;
