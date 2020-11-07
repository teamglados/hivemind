import * as React from "react";

export const useInputFocusMount = () => {
  const inputRef = React.useRef<any>(null);

  React.useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return inputRef;
};
