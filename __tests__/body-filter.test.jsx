import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { StyleProvider, ThemePicker } from "vcc-ui";
import SelectBody from "../src/components/SelectBody";

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

  beforeEach(() => {
    container = render(
      <StyleProvider>
        <ThemePicker variant="light">
          <SelectBody
            carList={carList}
            selectBodyType={(bodyType) => setSelectedBodyType(bodyType)}
          />
        </ThemePicker>
      </StyleProvider>
    ).container;
  });

  it("body filter item count", async () => {
    expect(
      container.querySelector("[data-type='body-filter']")
    ).toBeInTheDocument();

    const bodyItemCount = container.querySelectorAll(
      "[data-type='body-filter-item']"
    ).length;
    expect(bodyItemCount).toEqual(2);
  });

  it("body filter lavel should exist", () => {
    expect(screen.getByLabelText(/Filter Cars by .*/i)).toBeInTheDocument();
  });
  
  it("body filter  should exist", () => {
    expect(screen.getAllByText(/suv/i)).toHaveLength(1);
  });
});
