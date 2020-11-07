import React from "react";

import Providers from "./components/Providers";
import Routes from "./routes";

export default function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}
