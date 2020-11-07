import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { motion } from "framer-motion";

import { randBetween, range } from "../utils/common";

type Props = {
  onHintClick: any;
};

const Hints = ({ onHintClick }: Props) => {
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
      {range(5).map((_, i) => {
        const deg = randBetween(0, 360);

        return (
          <Story
            key={i}
            deg={deg}
            as={motion.div}
            layoutId={`story-background-${i}`}
            variants={itemVariants}
            onClick={() => onHintClick({ gradientDeg: deg, i })}
          >
            <StoryContent />
          </Story>
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
