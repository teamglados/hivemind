import React from "react";
import { Stack } from "styled-layout";
import { Text, GradientText, Spinner } from "../components/common";
import logo from "../images/logo.svg";
import textLogo from "../images/text-logo.png";

const Home = () => {
  return (
    <Stack spacing="medium" axis="y">
      <img src={logo} style={{ width: 48 }} />
      <img src={textLogo} style={{ width: 300 }} />
      <GradientText variant="title-1">Home</GradientText>
      <Text variant="title-1">Home</Text>
      <Text variant="title-2">Home</Text>
      <Text variant="title-3">Home</Text>
      <Text variant="body">Home</Text>
      <Text variant="body-small">Home</Text>
      <Text variant="overline">Home</Text>
      <Spinner size="large" color="dark" />
    </Stack>
  );
};

export default Home;
