import * as React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

import { useInputFocusMount } from "../../utils/hooks";
import Button from "./Button";

type Props = {
  value: string;
  onChange: any;
  onSubmit: any;
  buttonLabel: string;
  buttonIcon: React.ReactNode;
};

const Textarea = ({
  onSubmit,
  value,
  onChange,
  buttonLabel,
  buttonIcon,
}: Props) => {
  const [focused, setFocused] = React.useState(false);
  const inputRef = useInputFocusMount();

  return (
    <Wrapper onSubmit={onSubmit} focused={focused}>
      <Field
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        minRows={3}
        maxRows={6}
      />
      <Button
        type="submit"
        variant="primary"
        disabled={value.length === 0}
        onClick={onSubmit}
        icon={buttonIcon}
      >
        {buttonLabel}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.form<{ focused: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: ${(p) => p.theme.radii.medium};
  padding: ${(p) => p.theme.spacing.small};
  background-color: ${(p) => p.theme.colors["grey-200"]};
  border: 1px solid
    ${(p) =>
      p.focused ? p.theme.colors["grey-300"] : p.theme.colors["grey-200"]};

  button {
    align-self: flex-end;
  }
`;

const Field = styled(TextareaAutosize)`
  appearance: none;
  border: none;
  resize: none;
  background: transparent;
  padding: ${(p) => p.theme.spacing.small};
  ${(p) => p.theme.typography.body}
`;

export default Textarea;
