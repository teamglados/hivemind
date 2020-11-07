import { AsyncAction, Action } from "overmind";
import { NavigateFunction } from "react-router";

type State = {
  name: null | string;
};

export const state: State = {
  name: localStorage.getItem("user"),
};

const login: AsyncAction<{ user: string; navigate: NavigateFunction }> = async (
  { state, effects },
  value
) => {
  const { user, navigate } = value;

  // Login and persist user
  const data = await effects.api.login(user);
  console.log({ data });

  localStorage.setItem("user", user);

  state.user.name = user;
  navigate("/home");
};

const logout: Action<string> = ({ state }, value) => {
  state.user.name = null;
};

export const actions = {
  login,
  logout,
};
