import "styled-components";
import { MediaQuery } from "styled-layout";

declare module "styled-components" {
  interface Breakpoints {
    phone: { min: number; max: number };
    tablet: { min: number; max: number };
    desktop: { min: number; max: number };
    monitor: { min: number; max: number };
    tabletDown: { max: number };
    tabletUp: { min: number };
    desktopDown: { max: number };
    desktopUp: { min: number };
  }

  export interface DefaultTheme {
    colors: {
      divider: string;
      white: string;
      black: string;
      "grey-100": string;
      "grey-200": string;
      "grey-300": string;
      "grey-400": string;
      "grey-500": string;
      "grey-600": string;
      "grey-700": string;
      "grey-800": string;
      "grey-900": string;
    };
    typography: {
      "title-1": any;
      "title-1": any;
      "title-2": any;
      "title-2": any;
      "title-3": any;
      "title-3": any;
      body: any;
      body: any;
      "body-small": any;
      "body-small": any;
      overline: any;
      overline: any;
    };
    spacing: {
      none: string;
      xxsmall: string;
      xsmall: string;
      small: string;
      normal: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
      default: string;
    };
    shadows: {
      small: string;
      normal: string;
      medium: string;
      large: string;
    };
    radii: {
      small: string;
      normal: string;
      medium: string;
      full: string;
    };
    breakpoints: Breakpoints;
    media: MediaQuery<Breakpoints>;
  }
}
