import React from "react";
import styled from "styled-components";

const PageLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );
};

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  background-color: ${(p) => p.theme.colors["grey-100"]};
`;

const Content = styled.main`
  flex: 1;
  padding: ${(p) => p.theme.spacing.normal}px;
`;

export default PageLayout;
