import React from "react";
import { Stack } from "styled-layout";
import styled, { DefaultTheme, keyframes } from "styled-components";
import { BsArrowRight } from "react-icons/bs";
import { FiAward } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useMount from "react-use/lib/useMount";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { range, randBetween, truncate } from "../utils/common";
import { Button, Text } from "../components/common";
import { useAppState } from "../models";
import { RequestState } from "../models/types";

const Home = () => {
  const { actions, state } = useAppState();
  const navigate = useNavigate();

  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  useMount(() => {
    actions.question.getQuestions();
  });

  return (
    <Stack spacing="medium" axis="y">
      <Text variant="title-2">Exercise questions</Text>

      {state.question.getQuestions === RequestState.PENDING && (
        <Stack
          spacing="medium"
          axis="y"
          as={motion.div}
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {range(8).map((i) => (
            <LoadingPlaceholder
              key={i}
              as={motion.div}
              variants={itemVariants}
            />
          ))}
        </Stack>
      )}

      {state.question.getQuestions === RequestState.SUCCESS && (
        <Stack
          spacing="medium"
          axis="y"
          as={motion.div}
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {state.question.questions.map((question, i) => (
            <QuestionCard key={i} as={motion.div} variants={itemVariants}>
              <Stack axis="x">
                <QuestionCardContent axis="y" spacing="normal">
                  <Text variant="title-3">Question {i + 1}</Text>
                  <Text variant="body">{truncate(question.question, 30)}</Text>
                </QuestionCardContent>

                <QuestionScore deg={randBetween(0, 360)}>
                  <Stack axis="y" spacing="medium">
                    <Stack axis="y" spacing="xxsmall">
                      <Text variant="overline" color="white">
                        Reward
                      </Text>
                      <Stack axis="x" spacing="xsmall" align="center">
                        <Text variant="title-2" color="white">
                          {question.score}
                        </Text>
                        <FiAward size={32} color="#fff" />
                      </Stack>
                    </Stack>

                    {!question.is_correct ? (
                      <Button
                        variant="white"
                        icon={<BsArrowRight size={24} />}
                        onClick={() =>
                          navigate(`/questions/${question.id}`, {
                            state: { order: i },
                          })
                        }
                      >
                        View
                      </Button>
                    ) : (
                      <AnsweredStack axis="x" spacing="xsmall" align="center">
                        <IoIosCheckmarkCircle size={40} color="#fff" />
                        <Text variant="body-small" color="white">
                          Answered
                        </Text>
                      </AnsweredStack>
                    )}
                  </Stack>
                </QuestionScore>
              </Stack>
            </QuestionCard>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

const bgAnim = (theme: DefaultTheme) => keyframes`
  0% { background-color: ${theme.colors["white"]}; }
  50% { background-color: ${theme.colors["grey-200"]}}
  100% { background-color: ${theme.colors["white"]} }
`;

const QuestionCard = styled.div`
  border-radius: ${(p) => p.theme.radii.medium};
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.shadows.normal};
  max-width: 600px;
  overflow: hidden;
`;

const QuestionCardContent = styled(Stack)`
  flex: 1;
  padding: ${(p) => p.theme.spacing.xlarge};
`;

const QuestionScore = styled.div<{ deg: number }>`
  min-width: 245px;
  padding: ${(p) => p.theme.spacing.large} ${(p) => p.theme.spacing.xxlarge};
  background-image: linear-gradient(
    ${(p) => p.deg}deg,
    ${(p) => p.theme.colors.primary},
    ${(p) => p.theme.colors.secondary}
  );
`;

const LoadingPlaceholder = styled.div`
  height: 207px;
  max-width: 600px;
  border-radius: ${(p) => p.theme.radii.medium};
  animation: ${(p) => bgAnim(p.theme)} 3s linear infinite;
`;

const AnsweredStack = styled(Stack)`
  padding: ${(p) => p.theme.spacing.xsmall};
  border-radius: ${(p) => p.theme.radii.normal};
  background-color: rgba(255, 255, 255, 0.2);
`;

export default Home;
