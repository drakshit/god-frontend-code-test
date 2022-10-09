import "../public/css/styles.scss";
import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import Main from "../src/components/Main";

function HomePage() {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <Main />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default HomePage;
