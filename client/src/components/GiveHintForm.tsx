import * as React from "react";
import { Stack, Divider } from "styled-layout";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BiSkipNextCircle } from "react-icons/bi";

import { Button, Text, Textarea } from "./common";

type Props = {
  onHintSubmit: any;
  onSkip: any;
  submittingHint: boolean;
};

const GiveHintForm = ({ onHintSubmit, onSkip, submittingHint }: Props) => {
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
          layout
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
            Twitter non-disclosure agreement vesting period user experience
            direct mailing channels iPad social media interaction design return
            on investment. Network effects success technology alpha angel
            investor startup.
          </Text>

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
