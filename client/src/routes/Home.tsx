import React from "react";
import { Stack } from "styled-layout";
import { Text, Spinner } from "../components/common";

const Home = () => {
  return (
    <Stack spacing="medium" axis="y">
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
