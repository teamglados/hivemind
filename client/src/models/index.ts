import { IConfig } from "overmind";
import { createHook } from "overmind-react";

import * as api from "../utils/api";
import * as user from "./user";
import * as question from "./question";
import { onInitialize } from "./init";

export const config = {
  onInitialize,
  state: {
    user: user.state,
    question: question.state,
  },
  actions: {
    user: user.actions,
    question: question.actions,
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
      onInitialize: typeof config.onInitialize;
    }> {}
}

export const useAppState = createHook<typeof config>();
