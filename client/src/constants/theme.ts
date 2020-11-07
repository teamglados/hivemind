import { css, DefaultTheme } from "styled-components";
import { createMediaQuery } from "styled-layout";

const baseBreakpoints = {
  phone: { min: 0, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1279 },
  monitor: { min: 1280, max: Infinity },
};

const breakpoints = {
  ...baseBreakpoints,
  tabletDown: { max: baseBreakpoints.tablet.max },
  tabletUp: { min: baseBreakpoints.tablet.min },
  desktopDown: { max: baseBreakpoints.desktop.max },
  desktopUp: { min: baseBreakpoints.desktop.min },
};

export const media = createMediaQuery(breakpoints);

const theme: DefaultTheme = {
  colors: {
    primary: "#13A5F2",
    secondary: "#6F1BD1",
    "secondary-lightest": "#F6F2F7",
    white: "#ffffff",
    black: "#000000",
    divider: "#e2e8f0",
    "grey-100": "#f7fafc",
    "grey-200": "#edf2f7",
    "grey-300": "#e2e8f0",
    "grey-400": "#cbd5e0",
    "grey-500": "#a0aec0",
    "grey-600": "#718096",
    "grey-700": "#4a5568",
    "grey-800": "#2d3748",
    "grey-900": "#1a202c",
  },
  typography: {
    "large-title": css`
      font-weight: 900;
      font-size: 72px;
      line-height: 1;
      letter-spacing: -1.5px;
    `,
    "title-1": css`
      font-weight: 700;
      font-size: 56px;
      line-height: 1;
      letter-spacing: -1.5px;
    `,
    "title-2": css`
      font-weight: 700;
      font-size: 40px;
      line-height: 1.2;
    `,
    "title-3": css`
      font-weight: 700;
      font-size: 22px;
      line-height: 1.15;
    `,
    body: css`
      font-weight: 400;
      font-size: 16px;
      line-height: 1.5;
    `,
    "body-small": css`
      font-weight: 400;
      font-size: 12px;
      line-height: 1.4;
    `,
    overline: css`
      font-weight: 600;
      font-size: 10px;
      line-height: 1.6;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    `,
    "button-text": css`
      font-weight: 600;
      font-size: 15px;
      line-height: 1;
    `,
  },
  spacing: {
    none: " 0px",
    xxsmall: " 4px",
    xsmall: " 8px",
    small: "12px",
    normal: "16px",
    default: "16px",
    medium: "24px",
    large: "32px",
    xlarge: "40px",
    xxlarge: "56px",
    xxxlarge: "72px",
  },
  shadows: {
    small: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    normal:
      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    medium:
      "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    large:
      "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  radii: {
    small: "4px",
    normal: "8px",
    medium: "16px",
    large: "24px",
    full: "999px",
  },
  breakpoints,
  media,
};

export type Colors = keyof DefaultTheme["colors"];

export type Spacing = keyof DefaultTheme["spacing"];

export type Typography = keyof DefaultTheme["typography"];

export default theme;
