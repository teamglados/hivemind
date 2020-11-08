import { Action, AsyncAction } from "overmind";
import { AnswerState, Question, RequestState } from "./types";

type State = {
  questions: Question[];
  answerState: AnswerState;
  getQuestions: RequestState;
  answerQuestion: RequestState;
};

export const state: State = {
  questions: [],
  answerState: AnswerState.INITIAL,
  getQuestions: RequestState.INITIAL,
  answerQuestion: RequestState.INITIAL,
};

const getQuestions: AsyncAction = async ({ state, effects }) => {
  state.question.getQuestions = RequestState.PENDING;
  const data = await effects.api.getQuestions();

  if (!data.error) {
    state.question.questions = data.result;
    state.question.getQuestions = RequestState.SUCCESS;
  } else {
    state.question.getQuestions = RequestState.ERROR;
  }
};

const answerQuestion: AsyncAction<{ id: number; answer: string }> = async (
  { state, effects },
  { id, answer }
) => {
  state.question.answerQuestion = RequestState.PENDING;
  state.question.answerState = AnswerState.INITIAL;

  const data = await effects.api.answerQuestion({ id, answer });

  if (!data.error) {
    const index = state.question.questions.findIndex(
      (q) => q.id === data.result.id
    );

    state.question.questions[index] = data.result;
    state.question.answerState = data.result.is_correct
      ? AnswerState.CORRECT
      : AnswerState.INCORRECT;
    state.question.answerQuestion = RequestState.SUCCESS;
  } else {
    state.question.answerQuestion = RequestState.ERROR;
  }
};

const setAnswerState: Action<AnswerState> = ({ state }, answerState) => {
  state.question.answerState = answerState;
};

const resetStates: Action = ({ state }) => {
  state.question.answerState = AnswerState.INITIAL;
  state.question.answerQuestion = RequestState.INITIAL;
};

export const actions = {
  getQuestions,
  answerQuestion,
  setAnswerState,
  resetStates,
};
