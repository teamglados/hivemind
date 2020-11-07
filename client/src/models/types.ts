export enum RequestState {
  INITIAL = "INITIAL",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
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
