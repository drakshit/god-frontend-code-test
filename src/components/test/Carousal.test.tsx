import * as React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Carousal from "../Carousal";

describe("App", function () {
  it("should display pass in number", function () {
     let container = document.createElement('div');
       document.body.appendChild(container);
       act(() => {
           ReactDOM.render(<Carousal />, container);
       })
       const header = container.querySelector('h1');
       expect(header?.textContent).toBe("Hello world React! Num: 191")
  });
});
