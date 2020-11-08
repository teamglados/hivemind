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
  active_discussion_id: null | string;
  active_question_id: null | number;
  active_question_last_active: null | number;
  answer_score: number;
  created_at: string;
  chat_active: boolean;
  hint_score: number;
  id: number;
  is_question_active: boolean;
  name: string;
  score: number;
};

export type ChatMessage = {
  id: number;
  value: string;
  score: number;
  discussion_id: string;
  user_id: number;
  created_at: string;
};
