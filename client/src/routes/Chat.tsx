import * as React from "react";

import { Text } from "../components/common";
import ChatThemeProvider from "../components/ChatThemeProvider";
import Chat from "../components/Chat";

const ChatTest = () => {
  return (
    <Text variant="title-1">
      <ChatThemeProvider>
        <Chat />
      </ChatThemeProvider>
    </Text>
  );
};

export default ChatTest;
