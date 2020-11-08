import { AsyncAction } from "overmind";
import { ChatMessage } from "./types";

type State = {
  messages: ChatMessage[];
};

export const state: State = {
  messages: [],
};

const getMessages: AsyncAction<{ discussionId: string }> = async (
  { state, effects },
  { discussionId }
) => {
  const data = await effects.api.getChatMessages({ discussionId });

  if (!data.error) {
    state.chat.messages = data.result;
  }
};

const startChat: AsyncAction<{ questionId: number }> = async (
  { state, effects },
  { questionId }
) => {
  const data = await effects.api.startChat({ questionId });

  if (!data.error) {
    // TODO
  }
};

const closeChat: AsyncAction = async ({ state, effects }) => {
  const data = await effects.api.closeChat();

  if (!data.error) {
    // TODO
  }
};

const addMessage: AsyncAction<{
  discussionId: string;
  message: string;
}> = async ({ effects, actions }, { discussionId, message }) => {
  const data = await effects.api.addChatMessage({ discussionId, message });

  if (!data.error) {
    actions.chat.getMessages({ discussionId });
  }
};

export const actions = {
  getMessages,
  startChat,
  closeChat,
  addMessage,
};
