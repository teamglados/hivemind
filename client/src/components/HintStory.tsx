import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BsInfoSquareFill } from "react-icons/bs";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

import { Button, Text } from "./common";

type Hint = {
  gradientDeg: number;
  i: number;
};

type Props = {
  onPositiveAction: any;
  onNegativeAction: any;
  onCancel: any;
  hint: Hint;
};

const HintStory = ({
  onPositiveAction,
  onNegativeAction,
  onCancel,
  hint,
}: Props) => {
  const [hasAcceptedPenalty, setHasAcceptedPenalty] = React.useState(false);

  return (
    <Wrapper as={motion.div} exit={{ opacity: 0 }}>
      <Content
        deg={hint.gradientDeg}
        as={motion.div}
        layoutId={`story-background-${hint.i}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1, opacity: 0 }}
      >
        {hasAcceptedPenalty ? (
          <Stack
            axis="y"
            spacing="large"
            align="space-around"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            style={{ height: "100%" }}
          >
            <Stack axis="y" align="center" justify="center" style={{ flex: 1 }}>
              <StylizedText variant="title-3">
                Sales interaction design gamification{" "}
              </StylizedText>
            </Stack>

            <Stack axis="x" spacing="large" align="center" justify="center">
              <Button
                variant="primary"
                onClick={onNegativeAction}
                icon={<span>👎</span>}
              >
                NOT useful
              </Button>
              <Button
                variant="white"
                onClick={onPositiveAction}
                icon={<span>👍</span>}
              >
                Useful
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack
            axis="y"
            spacing="large"
            align="center"
            justify="center"
            as={motion.div}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <BsInfoSquareFill size={80} color="#fff" />

            <Text variant="title-2" align="center" color="white">
              Before you go forward...
            </Text>

            <Text variant="body" align="center" color="white">
              This hint has a point penalty of:
            </Text>

            <PointPenalty>-20</PointPenalty>

            <Text variant="body" align="center" color="white">
              Are you sure you want to view the hint?
            </Text>

            <Stack axis="x" spacing="large" align="center">
              <Button
                onClick={onCancel}
                variant="primary"
                icon={<IoIosCloseCircle size={24} />}
              >
                Go back
              </Button>
              <Button
                onClick={() => setHasAcceptedPenalty(true)}
                variant="white"
                icon={<IoIosCheckmarkCircle size={24} />}
              >
                View hint
              </Button>
            </Stack>
          </Stack>
        )}
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
`;

const Content = styled.div<{ deg: number }>`
  width: 600px;
  height: 80vh;
  height: minmax(800px, 80vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(p) => p.theme.spacing.xxlarge};
  border-radius: ${(p) => p.theme.radii.large};
  box-shadow: ${(p) => p.theme.shadows.large};
  background-image: linear-gradient(
    ${(p) => p.deg}deg,
    ${(p) => p.theme.colors.secondary},
    ${(p) => p.theme.colors.primary}
  );
`;

const StylizedText = styled(Text)`
  background-color: #fff;
  border-radius: ${(p) => p.theme.radii.normal};
  padding: ${(p) => p.theme.spacing.xsmall};
`;

const PointPenalty = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${(p) => p.theme.radii.normal};
  padding: ${(p) => p.theme.spacing.medium} ${(p) => p.theme.spacing.large};
  color: ${(p) => p.theme.colors.white};
  ${(p) => p.theme.typography["title-1"]}
`;

export default React.memo(HintStory);
