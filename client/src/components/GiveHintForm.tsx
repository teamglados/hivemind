import * as React from "react";
import { Stack, Divider } from "styled-layout";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaHandHoldingHeart } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { BiSkipNextCircle } from "react-icons/bi";

import { Button, Text, Textarea } from "./common";
import theme from "../constants/theme";

type Props = {
  onHintSubmit: any;
  onSkip: any;
  submittingHint: boolean;
  errorMessage: null | string;
};

const GiveHintForm = ({
  onHintSubmit,
  onSkip,
  submittingHint,
  errorMessage,
}: Props) => {
  const [hint, setHint] = React.useState("");

  const submitAnswer = (event: any) => {
    event.preventDefault();
    if (hint.length > 0) onHintSubmit(hint);
  };

  return (
    <Wrapper as={motion.div} exit={{ opacity: 0 }}>
      <Content
        as={motion.div}
        layoutId="card-background"
        exit={{ scale: 0, opacity: 0 }}
      >
        <Stack
          axis="y"
          spacing="large"
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Text variant="title-2" align="center">
            Give hint to help others
          </Text>

          <Text variant="body" align="center">
            You can write a hint to help other students trying to solve this
            exercise and to earn points and get exemptions in course marks.
            Other students can upvote your hint to mark it as helpful. But don't
            reveal the true answer! Hints too close to the original answer will
            be flagged.
          </Text>

          {errorMessage && (
            <Stack
              axis="x"
              spacing="small"
              as={motion.div}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <RiErrorWarningFill size={22} color={theme.colors.secondary} />
              <Text variant="body">{errorMessage}</Text>
            </Stack>
          )}

          <Textarea
            onSubmit={submitAnswer}
            value={hint}
            onChange={setHint}
            buttonLoading={submittingHint}
            buttonLabel="Submit hint"
            buttonIcon={
              <FaHandHoldingHeart
                size={22}
                style={{ transform: "rotate(15deg)" }}
              />
            }
          />

          <Divider size="large" color="grey-200" />

          <Stack axis="x" spacing="normal" align="center" justify="center">
            <Text variant="body" align="center">
              You can also skip giving a hint.
            </Text>

            <div>
              <Button
                size="small"
                variant="dimmed"
                icon={<BiSkipNextCircle size={20} />}
                onClick={onSkip}
              >
                Skip
              </Button>
            </div>
          </Stack>
        </Stack>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
`;

const Content = styled.div`
  background-color: #fff;
  padding: ${(p) => p.theme.spacing.xxlarge};
  border-radius: ${(p) => p.theme.radii.large};
  box-shadow: ${(p) => p.theme.shadows.large};
  max-width: 600px;
`;

export default React.memo(GiveHintForm);
