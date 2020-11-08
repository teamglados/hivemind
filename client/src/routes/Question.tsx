import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { RiQuestionFill, RiErrorWarningFill } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import { RequestState, AnswerState } from "../models/types";
import { useAppState } from "../models";
import theme from "../constants/theme";
import { BackButton, Text, Textarea } from "../components/common";
import Hints from "../components/Hints";
import CorrectAnswer from "../components/CorrectAnswer";
import GiveHintForm from "../components/GiveHintForm";
import HintStory from "../components/HintStory";
import { action } from "overmind";

type Hint = {
  gradientDeg: number;
  i: number;
};

const Question = () => {
  const [activeHint, setActiveHint] = React.useState<null | Hint>(null);
  const [answer, setAnswer] = React.useState("");
  const { state, actions } = useAppState();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const question = state.question.questions.find(
    (q) => q.id === Number(params.id)
  );

  const submitAnswer = (event: any) => {
    event.preventDefault();

    if (
      question &&
      answer.length > 0 &&
      (state.question.answerState === AnswerState.INITIAL ||
        state.question.answerState === AnswerState.INCORRECT)
    ) {
      actions.question.answerQuestion({ id: question.id, answer });
    }
  };

  const submitHint = (hint: string) => {
    if (question) {
      actions.hint.addHint({ navigate, hint, questionId: question.id });
    }
  };

  const handleHintReaction = (reaction: 0 | 1 | -1) => {
    console.log("> Reaction", reaction);
    setActiveHint(null);
  };

  React.useEffect(() => {
    if (
      !question ||
      (question &&
        question.is_correct &&
        state.question.answerState === AnswerState.INITIAL)
    )
      navigate("/home");
  }, [question, state.question.answerState, navigate]);

  React.useEffect(() => {
    return () => {
      actions.question.resetStates();
    };
  }, []);

  return (
    <AnimateSharedLayout>
      <Stack axis="y" spacing="small">
        <BackButton to="/home" />

        <Stack axis="y" spacing="xlarge">
          <Text variant="title-1">
            Question {Number((location.state as any).order) + 1}
          </Text>

          <Stack axis="y" spacing="small">
            <Text variant="overline">Hints</Text>
            <Hints onHintClick={setActiveHint} />
          </Stack>

          <Stack axis="y" spacing="small">
            <Text variant="overline">Question</Text>

            <QuestionCard>
              <Stack axis="y" spacing="large">
                <Stack axis="x" spacing="small">
                  <RiQuestionFill size={32} color={theme.colors["grey-700"]} />
                  <Text variant="body">{question?.question}</Text>
                </Stack>

                {state.question.answerState === AnswerState.INCORRECT && (
                  <Stack
                    axis="x"
                    spacing="small"
                    as={motion.div}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    <RiErrorWarningFill
                      size={22}
                      color={theme.colors.secondary}
                    />
                    <Text variant="body">
                      Incorrect answer - please try again.
                    </Text>
                  </Stack>
                )}

                <Textarea
                  onSubmit={submitAnswer}
                  value={answer}
                  onChange={setAnswer}
                  buttonLabel="Submit answer"
                  buttonIcon={
                    <IoIosSend
                      size={24}
                      style={{ transform: "rotate(15deg)" }}
                    />
                  }
                  buttonLoading={
                    state.question.answerQuestion === RequestState.PENDING
                  }
                />
              </Stack>
            </QuestionCard>
          </Stack>
        </Stack>
      </Stack>

      {state.question.answerState === AnswerState.CORRECT && (
        <CorrectAnswer
          onReadyToClose={() =>
            actions.question.setAnswerState(AnswerState.GIVE_HINT)
          }
        />
      )}

      <AnimatePresence>
        {state.question.answerState === AnswerState.GIVE_HINT && (
          <GiveHintForm onHintSubmit={submitHint} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeHint && (
          <HintStory
            key={activeHint.i}
            hint={activeHint}
            onNegativeAction={() => handleHintReaction(-1)}
            onPositiveAction={() => handleHintReaction(1)}
            onCancel={() => handleHintReaction(0)}
          />
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

const QuestionCard = styled.div`
  border-radius: ${(p) => p.theme.radii.medium};
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.shadows.normal};
  padding: ${(p) => p.theme.spacing.medium};
  max-width: 600px;
`;

export default Question;
