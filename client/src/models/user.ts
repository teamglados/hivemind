import { AsyncAction, Action } from "overmind";
import { NavigateFunction } from "react-router";

import { getPersistedUser } from "../utils/storage";
import { UserData } from "./types";

type State = {
  name: null | string;
  data: null | UserData;
};

export const state: State = {
  name: getPersistedUser(),
  data: null,
};

const getUser: AsyncAction = async ({ state, effects }) => {
  const data = await effects.api.getUser();

  if (!data.error) {
    state.user.data = data.result;
  }
};

const login: AsyncAction<{ user: string; navigate: NavigateFunction }> = async (
  { state, effects },
  value
) => {
  const { user, navigate } = value;
  const data = await effects.api.login(user);

  if (!data.error) {
    const token = data.result;
    localStorage.setItem("token", token);
    state.user.name = user;
    navigate("/home");
  } else {
    console.log("> Could not login!", data);
  }
};

const logout: Action = ({ state }) => {
  localStorage.removeItem("token");
  state.user.name = null;
};

export const actions = {
  login,
  logout,
  getUser,
};
