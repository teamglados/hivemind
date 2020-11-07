import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

import { BackButton, Text, Textarea } from "../components/common";
import Hints from "../components/Hints";
import CorrectAnswer from "../components/CorrectAnswer";
import GiveHintForm from "../components/GiveHintForm";

enum AnswerState {
  INITIAL = "INITIAL",
  CORRECT = "CORRECT",
  INCORRECT = "INCORRECT",
  GIVE_HINT = "GIVE_HINT",
}

const Question = () => {
  const [answer, setAnswer] = React.useState("");
  const [answerState, setAnswerState] = React.useState<AnswerState>(
    AnswerState.INITIAL
  );
  const params = useParams();
  const navigate = useNavigate();

  const submitAnswer = (event: any) => {
    event.preventDefault();

    if (answer.length > 0 && answerState === AnswerState.INITIAL) {
      setAnswerState(AnswerState.CORRECT);

      setTimeout(() => {
        setAnswerState(AnswerState.GIVE_HINT);
      }, 4000);
    }
  };

  const submitHint = (hint: string) => {
    console.log("> Hint", hint);
    setAnswerState(AnswerState.INITIAL);
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  return (
    <AnimateSharedLayout>
      <Stack axis="y" spacing="small">
        <BackButton to="/home" />

        <Stack axis="y" spacing="xlarge">
          <Text variant="title-1">Question {Number(params.i) + 1}</Text>

          <Stack axis="y" spacing="small">
            <Text variant="overline">Hints</Text>
            <Hints />
          </Stack>

          <Stack axis="y" spacing="small">
            <Text variant="overline">Question</Text>

            <QuestionCard>
              <Stack axis="y" spacing="large">
                <Text variant="body">
                  Twitter non-disclosure agreement vesting period user
                  experience direct mailing channels iPad social media
                  interaction design return on investment. Network effects
                  success technology alpha angel investor startup.
                </Text>

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
                />
              </Stack>
            </QuestionCard>
          </Stack>
        </Stack>
      </Stack>

      {answerState === AnswerState.CORRECT && <CorrectAnswer />}

      <AnimatePresence>
        {answerState === AnswerState.GIVE_HINT && (
          <GiveHintForm onHintSubmit={submitHint} />
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
