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
