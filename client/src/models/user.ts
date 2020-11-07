import { AsyncAction, Action } from "overmind";
import { NavigateFunction } from "react-router";

import { getPersistedUser } from "../utils/storage";

type State = {
  name: null | string;
};

export const state: State = {
  name: getPersistedUser(),
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
};
