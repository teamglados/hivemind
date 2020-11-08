import * as React from "react";
import { Launcher } from "react-chat-window";
import styled from "styled-components";
import useInterval from "react-use/lib/useInterval";

import { useAppState } from "../models";

const Chat = () => {
  const { actions, state } = useAppState();
  const userId = state.user.data?.id;
  const discussionId = state.user.data?.active_discussion_id;

  const messages = state.chat.messages.map((m) => ({
    author: userId === m.user_id ? "me" : "them",
    type: "text",
    data: { text: m.value },
  }));

  const closeChat = () => {
    actions.chat.closeChat();
  };

  const onMessageWasSent = (message: any) => {
    console.log({ message });
    if (message.data.text && discussionId) {
      actions.chat.addMessage({ discussionId, message: message.data.text });
    }
  };

  useInterval(() => {
    if (discussionId) actions.chat.getMessages({ discussionId });
  }, 2000);

  return (
    <Wrapper>
      <Launcher
        agentProfile={{ teamName: "HiveMind Chat" }}
        onMessageWasSent={onMessageWasSent}
        messageList={messages}
        handleClick={closeChat}
        isOpen
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sc-chat-window {
    font-family: "Inter", sans-serif;
  }

  .sc-header {
    background: none;
    background-image: linear-gradient(
      15deg,
      ${(p) => p.theme.colors.secondary},
      ${(p) => p.theme.colors.primary}
    );
  }

  .sc-launcher {
    background: ${(p) => p.theme.colors.secondary};
  }

  .sc-message--content.sent .sc-message--text {
    background: ${(p) => p.theme.colors.primary};
  }

  .sc-message--text {
    ${(p) => p.theme.typography.body}
  }
`;

export default Chat;
