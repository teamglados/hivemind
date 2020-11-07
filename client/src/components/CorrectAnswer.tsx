import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { motion } from "framer-motion";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { IoIosCheckmarkCircle } from "react-icons/io";
import useMount from "react-use/lib/useMount";

import { Text } from "./common";

type Props = {
  onReadyToClose: any;
};

const CorrectAnswer = ({ onReadyToClose }: Props) => {
  const { width, height } = useWindowSize();

  useMount(() => {
    setTimeout(onReadyToClose, 4000);
  });

  return (
    <Wrapper>
      <Content
        as={motion.div}
        layoutId="card-background"
        initial={{ rotate: "35deg", scale: 0, opacity: 0 }}
        animate={{ rotate: "0deg", scale: 1, opacity: 1 }}
        exit={{ rotate: "0deg", scale: 1, opacity: 0 }}
      >
        <Stack axis="y" spacing="medium" align="center" justify="center">
          <IoIosCheckmarkCircle size={140} color="#2ede07" />
          <Stack axis="y" spacing="small">
            <Text variant="title-3" align="center">
              Your answer is correct!
            </Text>
            <Text variant="body" align="center">
              You can now give a hint to help other people.
            </Text>
          </Stack>
        </Stack>
      </Content>

      <Confetti width={width} height={height} />
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
`;

export default React.memo(CorrectAnswer);
