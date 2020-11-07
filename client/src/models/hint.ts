import { AsyncAction } from "overmind";
import { RequestState, Hint } from "./types";

type State = {
  hints: Hint[];
  addHint: RequestState;
};

export const state: State = {
  hints: [],
  addHint: RequestState.INITIAL,
};

const addHint: AsyncAction<{ hint: string; questionId: number }> = async (
  { state, effects },
  { hint, questionId }
) => {
  state.hint.addHint = RequestState.PENDING;
  const data = await effects.api.addHint({ questionId, hint });

  if (!data.error) {
    // state.hint.hints = data.result;
    state.hint.addHint = RequestState.SUCCESS;
  } else {
    state.hint.addHint = RequestState.ERROR;
  }
};

export const actions = {
  addHint,
};
