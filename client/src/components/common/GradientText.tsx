import styled from "styled-components";
import Text from "./Text";

const GradientText = styled(Text)`
  background-image: linear-gradient(
    to right,
    ${(p) => p.theme.colors.primary},
    ${(p) => p.theme.colors.secondary}
  );
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

export default GradientText;
