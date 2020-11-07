import React from "react";
import { Route, Navigate } from "react-router-dom";

import { useAppState } from "../models";

type Props = {
  element: React.ReactElement;
  path: string;
};

const ProtectedRoute: React.FC<Props> = ({ element, path, children }) => {
  const { state } = useAppState();
  const isAuthenticated = !!state.user.name;

  return isAuthenticated ? (
    <Route path={path} element={element}>
      {children}
    </Route>
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default ProtectedRoute;
