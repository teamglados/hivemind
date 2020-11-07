import * as React from "react";
import { ThemeProvider, defaultTheme } from "@livechat/ui-kit";
import styled from "styled-components";

const ChatThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  font-size: 16px;
`;

export default ChatThemeProvider;
