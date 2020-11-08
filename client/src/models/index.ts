import { IConfig } from "overmind";
import { createHook } from "overmind-react";

import * as api from "../utils/api";
import * as user from "./user";
import * as question from "./question";
import * as hint from "./hint";
import * as chat from "./chat";

export const config = {
  state: {
    user: user.state,
    question: question.state,
    hint: hint.state,
    chat: chat.state,
  },
  actions: {
    user: user.actions,
    question: question.actions,
    hint: hint.actions,
    chat: chat.actions,
  },
  effects: {
    api,
  },
};

declare module "overmind" {
  interface Config
    extends IConfig<{
      state: typeof config.state;
      actions: typeof config.actions;
      effects: typeof config.effects;
    }> {}
}

export const useAppState = createHook<typeof config>();
