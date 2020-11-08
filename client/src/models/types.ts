export enum RequestState {
  INITIAL = "INITIAL",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum AnswerState {
  INITIAL = "INITIAL",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
  GIVE_HINT = "GIVE_HINT",
}

export type Question = {
  answer: string;
  answer_count: string;
  created_at: string;
  id: number;
  is_correct: boolean;
  question: string;
  score: number;
};

export type Hint = {
  created_at: string;
  id: number;
  purchased: boolean;
  question_id: number;
  total_score: number;
  user_id: number;
  value: string;
};

export type UserData = {
  active_discussion_id: null | number;
  active_question_id: null | number;
  active_question_last_active: null | number;
  answer_score: number;
  created_at: string;
  hint_score: number;
  id: number;
  name: string;
  score: number;
};
