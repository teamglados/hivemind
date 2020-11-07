import React from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";
import { FiAward } from "react-icons/fi";

import logo from "../images/logo.svg";
import { range } from "../utils/common";
import { GradientText, Text } from "./common";
import theme from "../constants/theme";

const Sidebar = () => {
  return (
    <Wrapper>
      <Content axis="y" spacing="none" justify="space-between">
        <Stack axis="y" spacing="large">
          <LogoStack axis="x" spacing="xsmall" align="center" justify="center">
            <Logo src={logo} />
            <GradientText variant="title-2">HiveMind</GradientText>
          </LogoStack>

          <Stack axis="y" spacing="xlarge">
            <Stack axis="y" spacing="normal">
              <Text variant="overline">Course</Text>
              <Text variant="title-3">Riddles for Everyone</Text>
            </Stack>

            <Stack axis="y" spacing="normal">
              <Text variant="overline">Exercises</Text>

              <ExerciseList>
                {range(7).map((index) => (
                  <ExerciseItem key={index} active={index === 2}>
                    <Text
                      variant="button-text"
                      color={index === 2 ? "grey-800" : "grey-600"}
                    >
                      Exercise {index + 1}
                    </Text>
                  </ExerciseItem>
                ))}
              </ExerciseList>
            </Stack>
          </Stack>
        </Stack>

        <ScoreStack axis="y" spacing="small">
          <Text variant="overline">Your course score</Text>

          <Stack axis="x" spacing="xsmall" align="center">
            <GradientText variant="title-2">420</GradientText>
            <FiAward size={32} color={theme.colors.secondary} />
          </Stack>
        </ScoreStack>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled(Stack).attrs({ axis: "y", spacing: "medium" })`
  padding: ${(p) => p.theme.spacing.medium};
  height: 100%;
`;

const Content = styled(Stack)`
  height: 100%;
`;

const ScoreStack = styled(Stack)`
  padding-top: ${(p) => p.theme.spacing.medium};
  border-top: 1px solid ${(p) => p.theme.colors["grey-200"]};
`;

const LogoStack = styled(Stack)`
  padding-top: ${(p) => p.theme.spacing.large};
  padding-bottom: ${(p) => p.theme.spacing.xlarge};
  border-bottom: 1px solid ${(p) => p.theme.colors["grey-200"]};
`;

const Logo = styled.img`
  height: 48px;
  width: auto;
`;

const ExerciseList = styled(Stack).attrs({
  as: "ul",
  axis: "y",
  spacing: "medium",
})`
  padding: 0;
`;

const ExerciseItem = styled.li<{ active: boolean }>`
  position: relative;
  margin: 0 -${(p) => p.theme.spacing.xsmall};
  padding: ${(p) => p.theme.spacing.normal};
  padding-left: ${(p) => p.theme.spacing.xlarge};
  border-radius: ${(p) => p.theme.radii.medium};
  background-color: ${(p) =>
    p.active ? p.theme.colors["grey-200"] : "transparent"};

  &::before {
    content: "";
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(p) =>
      p.active ? p.theme.colors.primary : p.theme.colors["grey-400"]};
  }
`;

export default Sidebar;
