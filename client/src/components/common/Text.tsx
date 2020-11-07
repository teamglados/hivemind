import React from "react";
import styled, { CSSProperties, DefaultTheme } from "styled-components";
import { Colors, Typography } from "../../constants/theme";

type Tags = keyof JSX.IntrinsicElements;

type Props = {
  variant: Typography;
  color?: Colors;
  align?: CSSProperties["textAlign"];
  as?: Tags;
};

type TransientProps = {
  $variant: Typography;
  $color?: Colors;
  $align?: CSSProperties["textAlign"];
};

type ThemedProps = TransientProps & { theme: DefaultTheme };

const Text: React.FC<Props> = ({
  color,
  variant,
  align,
  as: asTag,
  children,
  ...rest
}) => {
  const tag = asTag || variantToTag[variant];

  return (
    <TextBase
      {...rest}
      as={tag}
      $variant={variant}
      $color={color}
      $align={align}
    >
      {children}
    </TextBase>
  );
};

const variantToTag: { [key in Typography]: Partial<Tags> } = {
  "title-1": "h1",
  "title-2": "h2",
  "title-3": "h3",
  overline: "span",
  body: "p",
  "body-small": "p",
};

const TextBase = styled.span<TransientProps>`
  margin: 0;
  max-width: 100%;
  color: ${(p: ThemedProps) =>
    p.$color ? p.theme.colors[p.$color] : p.theme.colors.black};
  text-align: ${(p: ThemedProps) => p.$align || "left"};
  ${(p: ThemedProps) => p.theme.typography[p.$variant]};
`;

export default Text;
