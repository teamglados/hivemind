import styled, { keyframes } from "styled-components";
import theme from "../../constants/theme";

type Props = {
  size: "large" | "small";
  color: "dark" | "light";
};

const rotateAnim = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(359deg)" },
} as any);

const sizes = {
  small: "20px",
  large: "32px",
};

const colors = {
  dark: {
    bg: theme.colors["grey-200"],
    spin: theme.colors["grey-600"],
  },
  light: {
    bg: "rgba(255, 255, 255, .4)",
    spin: theme.colors.white,
  },
};

const Spinner = styled.div<Props>`
  width: ${(p) => sizes[p.size]};
  height: ${(p) => sizes[p.size]};
  border: 4px solid ${(p) => colors[p.color].bg};
  border-top: 4px solid ${(p) => colors[p.color].spin};
  border-radius: 50%;
  animation: ${rotateAnim} 0.6s infinite linear;
`;

export default Spinner;
