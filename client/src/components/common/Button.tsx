import * as React from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";
import { motion, AnimatePresence } from "framer-motion";

import { Colors } from "../../constants/theme";
import Spinner from "./Spinner";
import Text from "./Text";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props = {
  variant: "primary" | "white";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick: any;
};

const Button: React.FC<Props & ButtonProps> = ({
  variant,
  onClick,
  loading,
  disabled,
  icon,
  children,
}) => {
  return (
    <ButtonBase onClick={onClick} variant={variant} disabled={disabled}>
      <Stack axis="x" spacing="xsmall" align="center">
        <Text variant="button-text" color={variantToColor[variant]}>
          {children}
        </Text>

        {!loading ? icon : null}

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Spinner
                size="small"
                color={variant === "primary" ? "light" : "dark"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>
    </ButtonBase>
  );
};

const variantToBg: { [key in Props["variant"]]: Colors } = {
  primary: "primary",
  white: "white",
};

const variantToColor: { [key in Props["variant"]]: Colors } = {
  primary: "white",
  white: "secondary",
};

const ButtonBase = styled.button<Pick<Props, "variant">>`
  min-height: 54px;
  background-color: ${(p) => p.theme.colors[variantToBg[p.variant]]};
  color: ${(p) => p.theme.colors[variantToColor[p.variant]]};
  border-radius: ${(p) => p.theme.radii.medium};
  padding: ${(p) => p.theme.spacing.normal} ${(p) => p.theme.spacing.large};
  opacity: ${(p) => (p.disabled ? 0.3 : 1)};
  transition: opacity 100ms ease-in-out;

  &:hover {
    filter: brightness(${(p) => (p.variant === "white" ? 0.85 : 1.1)});
  }
`;

export default Button;
