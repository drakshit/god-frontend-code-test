import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import Carousal from "../src/components/carousal/Carousal";
import { createCarousalItems } from "../src/utils/Utils.function";

describe("Carousal Test", () => {
  let container = null;
  const carList = [
    {
      id: "xc90-recharge",
      modelName: "XC90 Recharge",
      bodyType: "suv",
      modelType: "plug-in hybrid",
      imageUrl: "/images/xc90_recharge.jpg",
    },
    {
      id: "v90-recharge",
      modelName: "V90 Recharge",
      bodyType: "estate",
      modelType: "plug-in hybrid",
      imageUrl: "/images/v90_recharge.jpg",
    },
    {
      id: "xc40-recharge",
      modelName: "XC40 Recharge",
      bodyType: "suv",
      modelType: "plug-in hybrid",
      imageUrl: "/images/xc40_recharge.jpg",
    },
  ];
  const carousalItems = createCarousalItems(carList);

  beforeEach(() => {
    container = render(
      <StyleProvider>
        <ThemePicker variant="light">
          <Carousal id="car-carousal" items={carousalItems} />
        </ThemePicker>
      </StyleProvider>
    ).container;
  });
  afterEach(() => {
    container.remove();
  });

  it("renders carousal", async () => {
    const carousalId = container.querySelector("#car-carousal");
    expect(carousalId).toBeInTheDocument();
  });

  it("carousal item count", async () => {
    let carousal = container.querySelector("#car-carousal");
    let carousalItemCount = carousal.querySelectorAll(
      "[data-type='carousal']"
    ).length;
    expect(carousalItemCount).toEqual(3);

    carousal = render(
      <StyleProvider>
        <ThemePicker variant="light">
          <Carousal id="car-carousal" items={[]} />
        </ThemePicker>
      </StyleProvider>
    ).container;
    carousalItemCount = carousal.querySelectorAll(
      "[data-type='carousal']"
    ).length;
    expect(carousalItemCount).toEqual(0);
  });

  it("carousal item should exist", async () => {
    expect(screen.getByText(/XC40 Recharge/i)).toBeInTheDocument();
    expect(screen.getAllByText(/suv/i)).toHaveLength(2);
  });
});
