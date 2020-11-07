import * as React from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";
import { useNavigate } from "react-router-dom";

import logo from "../images/logo.svg";
import { Text, GradientText, Button } from "../components/common";
import { useAppState } from "../models";
import { sleep } from "../utils/common";
import { useInputFocusMount } from "../utils/hooks";
import { motion } from "framer-motion";

const Login = () => {
  const [user, setUser] = React.useState("");
  const [isLoggingIn, setLoggingIn] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const { state } = useAppState();
  const inputRef = useInputFocusMount();
  const { actions } = useAppState();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.7,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 48 },
    show: { opacity: 1, y: 0 },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const login = async (event: any) => {
    event.preventDefault();

    // Fake out API call to show spinner
    setLoggingIn(true);
    await sleep(1000);

    if (user) {
      setLoggingIn(false);
      actions.user.login({ user, navigate });
    }
  };

  React.useEffect(() => {
    if (state.user.name) {
      navigate("/home");
    }
  }, [state.user.name, navigate]);

  return (
    <Stack
      axis="y"
      spacing="xlarge"
      align="center"
      justify="center"
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ height: "100%", width: "100%" }}
    >
      <Stack
        axis="y"
        spacing="small"
        justify="center"
        align="center"
        as={motion.div}
        variants={logoVariants}
      >
        <Logo src={logo} alt="logo" />
        <GradientText variant="large-title">HiveMind</GradientText>
      </Stack>

      <motion.div variants={formVariants}>
        <ContentStack axis="y" spacing="large">
          <Text variant="title-3" align="center">
            What's your name?
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
      </motion.div>
    </Stack>
  );
};

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
