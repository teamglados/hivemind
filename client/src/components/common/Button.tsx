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
  variant: "primary" | "dimmed";
  loading?: boolean;
  disabled?: boolean;
  onClick: any;
};

const Button: React.FC<Props & ButtonProps> = ({
  variant,
  onClick,
  loading,
  disabled,
  children,
}) => {
  return (
    <ButtonBase onClick={onClick} variant={variant} disabled={disabled}>
      <Stack axis="x" spacing="xsmall" align="center">
        <Text variant="button-text" color={variantToColor[variant]}>
          {children}
        </Text>

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
  dimmed: "grey-200",
};

const variantToColor: { [key in Props["variant"]]: Colors } = {
  primary: "white",
  dimmed: "grey-600",
};

const ButtonBase = styled.button<Pick<Props, "variant">>`
  min-height: 54px;
  background-color: ${(p) => p.theme.colors[variantToBg[p.variant]]};
  border-radius: ${(p) => p.theme.radii.medium};
  padding: ${(p) => p.theme.spacing.normal} ${(p) => p.theme.spacing.large};
  opacity: ${(p) => (p.disabled ? 0.3 : 1)};
  transition: opacity 100ms ease-in-out;

  span {
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    filter: brightness(1.1);
  }
`;

export default Button;
