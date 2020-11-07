import { AsyncAction } from "overmind";
import { Question, RequestState } from "./types";

type State = {
  questions: Question[];
  fetchState: RequestState;
};

export const state: State = {
  questions: [],
  fetchState: RequestState.INITIAL,
};

const getQuestions: AsyncAction = async ({ state, effects }) => {
  state.question.fetchState = RequestState.PENDING;
  try {
    const data = await effects.api.getQuestions();
    state.question.questions = data.result;
    state.question.fetchState = RequestState.SUCCESS;
  } catch (error) {
    state.question.fetchState = RequestState.ERROR;
  }
};

export const actions = {
  getQuestions,
};
