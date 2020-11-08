import { Action, AsyncAction } from "overmind";
import { NavigateFunction } from "react-router";
import { RequestState, Hint } from "./types";

type State = {
  hints: Hint[];
  getHints: RequestState;
  addHint: RequestState;
  openHint: RequestState;
  voteHint: RequestState;
};

export const state: State = {
  hints: [],
  getHints: RequestState.INITIAL,
  addHint: RequestState.INITIAL,
  openHint: RequestState.INITIAL,
  voteHint: RequestState.INITIAL,
};

const getHints: AsyncAction<{ questionId: number }> = async (
  { state, effects },
  { questionId }
) => {
  state.hint.getHints = RequestState.PENDING;
  const data = await effects.api.getHints({ questionId });

  if (!data.error) {
    state.hint.hints = data.result;
    state.hint.getHints = RequestState.SUCCESS;
  } else {
    state.hint.getHints = RequestState.ERROR;
  }
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

const openHint: AsyncAction<{
  hintId: number;
  onSuccess: () => any;
}> = async ({ state, effects }, { hintId, onSuccess }) => {
  state.hint.openHint = RequestState.PENDING;
  const data = await effects.api.openHint({ hintId });

  if (!data.error) {
    state.hint.openHint = RequestState.SUCCESS;
    onSuccess();
    state.hint.openHint = RequestState.INITIAL;
  } else {
    state.hint.openHint = RequestState.ERROR;
  }
};

const voteHint: AsyncAction<{
  hintId: number;
  score: 1 | -1;
  onSuccess: () => any;
}> = async ({ state, effects }, { hintId, score, onSuccess }) => {
  state.hint.voteHint = RequestState.PENDING;
  const data = await effects.api.voteHint({ hintId, score });

  if (!data.error) {
    state.hint.voteHint = RequestState.SUCCESS;
    onSuccess();
    state.hint.voteHint = RequestState.INITIAL;
  } else {
    state.hint.voteHint = RequestState.ERROR;
  }
};

const resetStates: Action = ({ state }) => {
  state.hint.addHint = RequestState.INITIAL;
  state.hint.getHints = RequestState.INITIAL;
  state.hint.voteHint = RequestState.INITIAL;
  state.hint.openHint = RequestState.INITIAL;
  state.hint.hints = [];
};

export const actions = {
  addHint,
  getHints,
  voteHint,
  openHint,
  resetStates,
};
