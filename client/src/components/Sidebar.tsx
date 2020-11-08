import React from "react";
import styled from "styled-components";
import { Stack, Divider } from "styled-layout";
import { FiAward, FiLogOut } from "react-icons/fi";
import useInterval from "react-use/lib/useInterval";

import logo from "../images/logo.svg";
import { range } from "../utils/common";
import { Button, GradientText, Text } from "./common";
import theme from "../constants/theme";
import { useAppState } from "../models";

const Sidebar = () => {
  const { actions, state } = useAppState();

  useInterval(() => {
    actions.user.getUser();
  }, 2000);

  return (
    <Wrapper>
      <Content axis="y" spacing="none">
        <Stack axis="y" spacing="large" style={{ flex: 1 }}>
          <Stack axis="x" spacing="xsmall" align="center">
            <Logo src={logo} />
            <GradientText variant="title-2">HiveMind</GradientText>
          </Stack>

          <Divider size="large" color="grey-200" />

          <Stack axis="y" spacing="xlarge">
            <Stack axis="y" spacing="normal">
              <Text variant="overline">Course</Text>
              <Text variant="title-3">Riddles for Everyone</Text>
            </Stack>

            <Stack axis="y" spacing="normal">
              <Text variant="overline">Exercises</Text>

              <ExerciseList>
                {range(5).map((index) => (
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

        {state.user.data && (
          <>
            <Divider size="large" color="grey-200" />

            <Stack axis="y" spacing="small">
              <Text variant="overline">Your course score</Text>

              <Stack axis="x" spacing="xsmall" align="center">
                <GradientText variant="title-2">
                  {state.user.data.score}
                </GradientText>
                <FiAward size={32} color={theme.colors.secondary} />
              </Stack>

              <Stack axis="x" spacing="xsmall" align="center">
                <GradientText variant="title-3">
                  +{state.user.data.hint_score}
                </GradientText>
                <Text variant="body-small">from hints you have submitted</Text>
              </Stack>
            </Stack>
          </>
        )}

        <Divider size="large" color="grey-200" />

        <Stack axis="x" spacing="normal">
          <Button
            variant="dimmed"
            size="small"
            onClick={() => actions.user.logout()}
            icon={<FiLogOut size={16} />}
          >
            Logout
          </Button>
        </Stack>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled(Stack).attrs({ axis: "y", spacing: "medium" })`
  padding: ${(p) => p.theme.spacing.large} ${(p) => p.theme.spacing.medium};
  height: 100%;
`;

const Content = styled(Stack)`
  height: 100%;
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
