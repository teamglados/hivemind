import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { motion } from "framer-motion";

import { randBetween, range } from "../utils/common";

const Hints = () => {
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
      {range(5).map((i) => (
        <Story
          key={i}
          deg={randBetween(0, 360)}
          as={motion.div}
          variants={itemVariants}
        >
          <StoryContent />
        </Story>
      ))}
    </Stack>
  );
};

const Story = styled.div<{ deg: number }>`
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
`;

const StoryContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default React.memo(Hints);
