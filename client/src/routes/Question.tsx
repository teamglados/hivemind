import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";

import { BackButton, Button, Text } from "../components/common";
import Hints from "../components/Hints";
import { useInputFocusMount } from "../utils/hooks";

const Question = () => {
  const [answer, setAnswer] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const inputRef = useInputFocusMount();
  const params = useParams();

  const submitAnswer = (event: any) => {
    event.preventDefault();
    console.log("> Submit");
  };

  return (
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
                Twitter non-disclosure agreement vesting period user experience
                direct mailing channels iPad social media interaction design
                return on investment. Network effects success technology alpha
                angel investor startup.
              </Text>

              <AnswerForm onSubmit={submitAnswer} focused={focused}>
                <AnswerField
                  ref={inputRef}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  minRows={3}
                  maxRows={6}
                />
                <Button
                  type="submit"
                  onClick={submitAnswer}
                  variant="primary"
                  icon={
                    <IoIosSend
                      size={24}
                      style={{ transform: "rotate(15deg)" }}
                    />
                  }
                >
                  Submit answer
                </Button>
              </AnswerForm>
            </Stack>
          </QuestionCard>
        </Stack>
      </Stack>
    </Stack>
  );
};

const QuestionCard = styled.div`
  border-radius: ${(p) => p.theme.radii.medium};
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.shadows.normal};
  padding: ${(p) => p.theme.spacing.medium};
  max-width: 600px;
`;

const AnswerForm = styled.form<{ focused: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: ${(p) => p.theme.radii.medium};
  padding: ${(p) => p.theme.spacing.small};
  background-color: ${(p) => p.theme.colors["grey-200"]};
  border: 1px solid
    ${(p) =>
      p.focused ? p.theme.colors["grey-300"] : p.theme.colors["grey-200"]};

  button {
    align-self: flex-end;
  }
`;

const AnswerField = styled(TextareaAutosize)`
  appearance: none;
  border: none;
  resize: none;
  background: transparent;
  padding: ${(p) => p.theme.spacing.small};
  ${(p) => p.theme.typography.body}
`;

export default Question;
