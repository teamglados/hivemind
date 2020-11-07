import * as React from "react";
import { Stack } from "styled-layout";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

type Props = {
  to?: string;
};

const BackButton = ({ to = ".." }: Props) => {
  return (
    <GoBack to={to}>
      <Stack axis="x" spacing="xsmall">
        <MdArrowBack size={16} />
        <span>Back</span>
      </Stack>
    </GoBack>
  );
};

const GoBack = styled(Link)`
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  color: ${(p) => p.theme.colors["grey-700"]};
  padding: ${(p) => p.theme.spacing.small};
  transform: translateX(-${(p) => p.theme.spacing.small});
  border-radius: ${(p) => p.theme.radii.medium};
  ${(p) => p.theme.typography["button-text"]}

  &:hover {
    background-color: #fff;
  }
`;

export default BackButton;
