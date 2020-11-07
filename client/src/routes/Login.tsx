import * as React from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo.svg";
import { Text, GradientText, Button } from "../components/common";
import { useAppState } from "../models";
import { sleep } from "../utils/common";

const Login = () => {
  const [user, setUser] = React.useState("");
  const [isLoggingIn, setLoggingIn] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { actions } = useAppState();
  const navigate = useNavigate();

  const login = async (event: any) => {
    event.preventDefault();

    // Fake out API call to show spinner
    setLoggingIn(true);
    await sleep(2000);

    if (user) {
      setLoggingIn(false);
      actions.user.login({ user, navigate });
    }
  };

  React.useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <WrapperStack axis="y" spacing="xlarge" align="center" justify="center">
      <LogoStack axis="y" spacing="small" justify="center" align="center">
        <Logo src={logo} alt="logo" />
        <GradientText variant="large-title">HiveMind</GradientText>
      </LogoStack>

      <ContentStack axis="y" spacing="large">
        <Text variant="title-3" align="center">
          What's you name?
        </Text>

        <Form onSubmit={login} focused={focused}>
          <Stack axis="x" align="center">
            <Input
              ref={inputRef}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <Button
              onClick={login}
              variant="primary"
              disabled={user.length === 0}
              loading={isLoggingIn}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </ContentStack>
    </WrapperStack>
  );
};

const WrapperStack = styled(Stack)`
  height: 100%;
  width: 100%;
`;

const LogoStack = styled(Stack)`
  margin-top: -${(p) => p.theme.spacing.xxlarge};
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
`;

const ContentStack = styled(Stack)`
  min-width: 450px;
  padding: ${(p) => p.theme.spacing.xlarge};
  border-radius: ${(p) => p.theme.radii.medium};
  background-color: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.shadows.large};
`;

const Form = styled.form<{ focused: boolean }>`
  border-radius: ${(p) => p.theme.radii.medium};
  padding: ${(p) => p.theme.spacing.small};
  padding-left: ${(p) => p.theme.spacing.normal};
  background-color: ${(p) => p.theme.colors["grey-200"]};
  border: 1px solid
    ${(p) =>
      p.focused ? p.theme.colors["grey-300"] : p.theme.colors["grey-200"]};
`;

const Input = styled.input`
  flex: 1;
  appearance: none;
  border: none;
  background: transparent;
  color: ${(p) => p.theme.colors["grey-800"]};
`;

export default Login;
