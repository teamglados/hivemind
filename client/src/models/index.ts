import { IConfig } from "overmind";
import { createHook } from "overmind-react";

import * as api from "../utils/api";
import * as storage from "../utils/storage";
import * as user from "./user";
import { onInitialize } from "./init";

export const config = {
  onInitialize,
  state: {
    user: user.state,
  },
  actions: {
    user: user.actions,
  },
  effects: {
    api,
    storage: {
      user: storage.createStorage("user"),
    },
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