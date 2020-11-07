import * as React from "react";

import {
  TitleBar,
  TextInput,
  MessageList,
  TextComposer,
  Row,
  Fill,
  Fit,
  SendButton,
} from "@livechat/ui-kit";

const Chat = () => {
  const onMessageSend = (message: string) => {
    console.log({ message });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <TitleBar title="Welcome to HiveChat" />

      <div
        style={{
          flexGrow: 1,
          minHeight: 0,
          height: "100%",
        }}
      >
        <MessageList active containScrollInSubtree>
          Messages here
        </MessageList>
      </div>

      <TextComposer onSend={onMessageSend}>
        <Row align="center">
          <Fill>
            <TextInput />
          </Fill>
          <Fit>
            <SendButton />
          </Fit>
        </Row>
      </TextComposer>
    </div>
  );
};

export default Chat;
