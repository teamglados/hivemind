import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { motion } from "framer-motion";

import { randBetween } from "../utils/common";
import { useAppState } from "../models";
import { Hint } from "../models/types";

type Props = {
  onHintClick: (x: { hint: Hint; gradientDeg: number }) => void;
};

const Hints = ({ onHintClick }: Props) => {
  const { state } = useAppState();

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
    hidden: { opacity: 0, y: -24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Stack
      axis="x"
      spacing="normal"
      as={motion.div}
      variants={listVariants}
      initial="hidden"
      animate="show"
    >
      {state.hint.hints.map((hint) => {
        const deg = randBetween(0, 360);

        return (
          <div key={hint.id} style={{ opacity: hint.purchased ? 0.3 : 1 }}>
            <Story
              key={hint.id}
              deg={deg}
              as={motion.div}
              layoutId={`story-background-${hint.id}`}
              variants={itemVariants}
              onClick={() => onHintClick({ gradientDeg: deg, hint })}
            >
              <StoryContent />
            </Story>
          </div>
        );
      })}
    </Stack>
  );
};

const Story = styled.button<{ deg: number }>`
  cursor: pointer;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  padding: 4px;
  background-image: linear-gradient(
    ${(p) => p.deg}deg,
    ${(p) => p.theme.colors.secondary},
    ${(p) => p.theme.colors.primary}
  );

  &:hover {
    filter: brightness(1.1);
  }
`;

const StoryContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;
`;

export default React.memo(Hints);
