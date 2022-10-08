import "../public/css/styles.scss";
import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import Header from "../src/components/Header";

function HomePage() {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <Header />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default HomePage;
