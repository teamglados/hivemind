import React from "react";
import styled from "styled-components";

import Sidebar from "./Sidebar";

const PageLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Navigation>
        <Sidebar />
      </Navigation>
      <Content>{children}</Content>
    </Layout>
  );
};

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

const Navigation = styled.nav`
  width: 400px;
  margin: ${(p) => p.theme.spacing.normal};
  background-color: #fff;
  border-radius: ${(p) => p.theme.radii.normal};
`;

const Content = styled.main`
  flex: 1;
  padding: ${(p) => p.theme.spacing.normal};
`;

export default PageLayout;
