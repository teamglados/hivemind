import React from "react";
import { Outlet } from "react-router-dom";

import PageLayout from "../components/PageLayout";

const Main = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default Main;
