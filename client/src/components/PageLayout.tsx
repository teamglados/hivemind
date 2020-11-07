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
  max-width: 1400px;
  min-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const Navigation = styled.nav`
  width: 400px;
  margin: ${(p) => p.theme.spacing.medium};
  background-color: #fff;
  border-radius: ${(p) => p.theme.radii.medium};
  box-shadow: ${(p) => p.theme.shadows.normal};
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.spacing.large};
  max-height: 100vh;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default PageLayout;
