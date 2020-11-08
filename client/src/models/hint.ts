import { AsyncAction } from "overmind";
import { NavigateFunction } from "react-router";
import { RequestState, Hint } from "./types";

type State = {
  hints: Hint[];
  addHint: RequestState;
};

export const state: State = {
  hints: [],
  addHint: RequestState.INITIAL,
};

const addHint: AsyncAction<{
  navigate: NavigateFunction;
  hint: string;
  questionId: number;
}> = async ({ state, effects }, { hint, questionId, navigate }) => {
  state.hint.addHint = RequestState.PENDING;
  const data = await effects.api.addHint({ questionId, hint });

  if (!data.error) {
    state.hint.addHint = RequestState.SUCCESS;
    setTimeout(() => navigate("/home"), 1000);
  } else {
    state.hint.addHint = RequestState.ERROR;
  }
};

export const actions = {
  addHint,
};
