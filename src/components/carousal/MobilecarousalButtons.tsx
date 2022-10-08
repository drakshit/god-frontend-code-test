import { useEffect, useState } from "react";
import { Block } from "vcc-ui";
import Constants from "../../config/Constants";
import { MobileViewCardCountType } from "../../model/CarModels";

import styles from "./carousal.module.scss";
/*
    MobileCarousalButtons component returns the HTML for Mobile navigation button to scroll carousal in a paginated way.
    This React component only call when device width is under mobile scale.
*/
const MobileCarousalButtons: React.FC<MobileViewCardCountType> = (
  mobileViewCardCountType: MobileViewCardCountType
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(
      Math.round(
        mobileViewCardCountType.carousalPos / Constants.mobileCardWidth
      )
    );
  }, [mobileViewCardCountType.carousalPos]);

  /*
  @param: index as number
  
  changeCarousal(): function use to update the current carousal card number when user scroll the carousal.
 */
  const changeCarousal = (index: number) => {
    setCurrentIndex(() => {
      mobileViewCardCountType.moveCarousal(Constants.mobileCardWidth * index);
      return index;
    });
  };

  return (
    <Block
      extend={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mobileViewCardCountType?.carousalCount &&
        new Array(mobileViewCardCountType.carousalCount)
          .fill(0)
          .map((_value: number, index: number) => (
            <Block
              key={`index-${index}`}
              as={"button"}
              onClick={() => changeCarousal(index)}
              extend={{
                backgroundColor: currentIndex === index ? "#d1d1d1" : "#f1f1f1",
                borderColor: currentIndex === index ? "#a1a1a1" : "#e1e1e1",
              }}
              className={styles.mobileNav}
              tabIndex={0}
            >
              &nbsp;
            </Block>
          ))}
    </Block>
  );
};

export default MobileCarousalButtons;
