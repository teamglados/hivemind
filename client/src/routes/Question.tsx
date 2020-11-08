import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { RiQuestionFill, RiErrorWarningFill } from "react-icons/ri";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import useMount from "react-use/lib/useMount";

import { RequestState, AnswerState, Hint } from "../models/types";
import { useAppState } from "../models";
import theme from "../constants/theme";
import {
  BackButton,
  Button,
  Spinner,
  Text,
  Textarea,
} from "../components/common";
import Hints from "../components/Hints";
import CorrectAnswer from "../components/CorrectAnswer";
import GiveHintForm from "../components/GiveHintForm";
import HintStory from "../components/HintStory";
import Chat from "../components/Chat";

type ActiveHint = {
  gradientDeg: number;
  hint: Hint;
};

const Question = () => {
  const [activeHint, setActiveHint] = React.useState<null | ActiveHint>(null);
  const [answer, setAnswer] = React.useState("");
  const { state, actions } = useAppState();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const question = state.question.questions.find(
    (q) => q.id === Number(params.id)
  );

  const chatActive = state.user.data?.chat_active && question;
  const discussionAvailable = state.user.data?.is_question_active;
  const discussionId = state.user.data?.active_discussion_id;

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

  const handleHintReaction = (score: 0 | 1 | -1) => {
    if (!activeHint) return;

    if (score === 1 || score === -1) {
      actions.hint.voteHint({
        hintId: activeHint.hint.id,
        score,
        onSuccess: () => {
          setActiveHint(null);
          if (question) actions.hint.getHints({ questionId: question.id });
        },
      });
    } else {
      setActiveHint(null);
    }
  };

  const startChat = () => {
    if (question && discussionAvailable) {
      actions.chat.startChat({ questionId: question.id });
    }
  };

  useMount(() => {
    if (question) {
      actions.hint.getHints({ questionId: question.id });
      actions.question.setActive(question.id);
    }
  });

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
      actions.hint.resetStates();
    };
  }, []); // eslint-disable-line

  return (
    <>
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

              <Card>
                <Stack axis="y" spacing="large">
                  <Stack axis="x" spacing="small">
                    <RiQuestionFill
                      size={32}
                      color={theme.colors["grey-700"]}
                    />
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
              </Card>
            </Stack>

            <Stack axis="y" spacing="small">
              <Text variant="overline">Discussion</Text>

              <Card>
                <Stack axis="y" spacing="normal">
                  {discussionAvailable ? (
                    <Text variant="body">
                      Got stuck? Discuss the problem at hand with other students
                      working on the same question
                    </Text>
                  ) : (
                    <Text variant="body">
                      Unfortunately nobody else is working on this question at
                      the moment.
                    </Text>
                  )}

                  {chatActive && discussionId && (
                    <Text variant="body">Discussion ongoing...</Text>
                  )}

                  {!chatActive && discussionId && (
                    <Stack axis="x" spacing="small">
                      <Text variant="body">
                        Waiting for co-student to join the discussion...
                      </Text>
                      <Spinner size="small" color="dark" />
                    </Stack>
                  )}

                  {!discussionId && (
                    <div>
                      <Button
                        onClick={startChat}
                        variant="primary"
                        size="small"
                        disabled={!discussionAvailable}
                        icon={
                          <HiOutlineChatAlt2
                            size={24}
                            style={{ transform: "rotate(15deg)" }}
                          />
                        }
                      >
                        Discuss now
                      </Button>
                    </div>
                  )}
                </Stack>
              </Card>
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
            <GiveHintForm
              onHintSubmit={submitHint}
              onSkip={() => navigate("/home")}
              submittingHint={state.hint.addHint === RequestState.PENDING}
              errorMessage={state.hint.addHintError}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeHint && (
            <HintStory
              key={activeHint.hint.id}
              question={question ? question.question : ""}
              activeHint={activeHint}
              onNegativeAction={() => handleHintReaction(-1)}
              onPositiveAction={() => handleHintReaction(1)}
              onCancel={() => handleHintReaction(0)}
            />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>

      {chatActive && <Chat />}
    </>
  );
};

const Card = styled.div`
  border-radius: ${(p) => p.theme.radii.medium};
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.shadows.normal};
  padding: ${(p) => p.theme.spacing.medium};
  max-width: 600px;
`;

export default Question;
