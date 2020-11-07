import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import ErrorBoundary from "../components/ErrorBoundary";
import Main from "./Main";

const NotFound = React.lazy(() => import("./NotFound"));
const Login = React.lazy(() => import("./Login"));
const Home = React.lazy(() => import("./Home"));

const AppRoutes = () => {
  return (
    <Routes>
      <ProtectedRoute path="/" element={<Main />}>
        <Route
          path="home"
          element={
            <Page>
              <Home />
            </Page>
          }
        />
      </ProtectedRoute>

      <Route
        path="login"
        element={
          <Page>
            <Login />
          </Page>
        }
      />

      <Route
        path="*"
        element={
          <Page>
            <NotFound />
          </Page>
        }
      />
    </Routes>
  );
};

const Page: React.FC = ({ children }) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={null}>{children}</React.Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
