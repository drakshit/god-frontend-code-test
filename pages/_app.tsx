import "../public/css/styles.scss";
import React from "react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import Carousal from "../src/components/Carousal";

function HomePage() {
  return (
    <React.StrictMode>
      <StyleProvider>
        <ThemePicker variant="light">
          <Carousal />
        </ThemePicker>
      </StyleProvider>
    </React.StrictMode>
  );
}

export default HomePage;
