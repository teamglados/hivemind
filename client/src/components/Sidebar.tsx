import React from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";

import logo from "../images/logo.svg";
import { range } from "../utils/common";
import { GradientText, Text } from "./common";

const Sidebar = () => {
  return (
    <Wrapper>
      <LogoStack axis="x" spacing="small" align="center" justify="center">
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
                  Exercise {index}
                </Text>
              </ExerciseItem>
            ))}
          </ExerciseList>
        </Stack>
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled(Stack).attrs({ axis: "y", spacing: "medium" })`
  padding: ${(p) => p.theme.spacing.normal};
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
