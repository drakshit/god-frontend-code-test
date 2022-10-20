import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Block, Card, CardContent, Flex, Spacer, Text, Link } from "vcc-ui";
import Constants from "../../config/Constants";
import { useWindowResize } from "../../utils/CustomHooks";
import MobileCarousalButtons from "./MobilecarousalButtons";
import { CarousalType } from "./carousal.model";

import styles from "./carousal.module.scss";

const thumbStyle = (imageUrl: string) => {
  return {
    justifyContent: "center",
    padding: "1rem",
    background: `url(${Constants.imagePath}${imageUrl}) no-repeat center`,
    backgroundSize: "contain",
    height: "16rem",
  };
};

interface ItemsProps {
  id?: string;
  items: CarousalType[];
}

/*
    This is Carousal component, responsiable to load the Carousal depending on number of Car available in responce object.
    Depending the screen width it loads respective carousal nav buttons. Loading will be shown until we receive response from backend.
    On Error a basic error component will be shown. 
*/
const Carousal: React.FC<ItemsProps> = (itemsProps: ItemsProps) => {
  const carousalBodyRef = useRef(null as any);

  const [notLargeScreen, setNotLargeScreen] = useState<boolean>(false);
  const [carousalPos, setCarousalPos] = useState<number>(0);
  const { width } = useWindowResize();

  useEffect(() => {
    setCarousalPos(0);
    try{
      carousalBodyRef?.current?.scroll({ left: 0, behavior: "smooth" });
    }catch(error: any){}
  }, [itemsProps]);
  /*
      Register the event only for not large screen and deregister on unload
    */
  useEffect(() => {
    const element = carousalBodyRef?.current;
    if (element && notLargeScreen) {
      const handleTouch = element.addEventListener("touchEnd", (e: any) => {
        setCarousalPos(e.changeTouches[0].screenX);
      });
      const handleScroll = element.addEventListener("scroll", () => {
        setCarousalPos(carousalBodyRef?.current.scrollLeft);
      });

      return () => {
        element.removeEventListener("touchEnd", handleTouch);
        element.removeEventListener("scroll", handleScroll);
      };
    }
  });

  /*
      Update Large-screen OR Mobile depending on device width
    */
  useEffect(() => {
    setNotLargeScreen(width < Constants.breakPoints.medium);
  }, [width]);

  /*
    @param: 
    flag as number : 1 for moving carousal towards right, 0 for left
    shiftPx as number : this is the amount of scroll on each click depending on mobile and big-screen card width
    isShiftFromStart as boolean: this property is mainly for mobile, if user swipe the carousal in between two items
    then on click one circle nav button below will scroll the carousal to correct item position.

    scrollCarousal(): function use to scroll the carousal to left/right depending on respective navigation button.
   */
  const scrollCarousal = (
    flag: number,
    shiftPx: number = Constants.cardWidth,
    isShiftFromStart: boolean = false
  ) => {
    const scrollObj = {
      left: isShiftFromStart
        ? shiftPx
        : flag
        ? carousalBodyRef?.current.scrollLeft + shiftPx
        : carousalBodyRef?.current.scrollLeft - shiftPx,
      behavior: "smooth",
    };
    try{
      carousalBodyRef?.current.scroll(scrollObj);
    }catch(error: any){}
  };

  /*
      NavButtons is a React component to render left & right arrow for large screen
    */
  const NavButtons: React.FC = useCallback(() => {
    return (
      <Block className={styles.navButtons}>
        <Block
          as="button"
          tabIndex={0}
          className={styles.left}
          onClick={() => scrollCarousal(0)}
        >
          <Image alt="left" src="/icons/chevron-circled.svg" layout="fill" />
        </Block>
        <Block
          as="button"
          tabIndex={0}
          className={styles.right}
          onClick={() => scrollCarousal(1)}
        >
          <Image alt="right" src="/icons/chevron-circled.svg" layout="fill" />
        </Block>
      </Block>
    );
  }, []);

  return (
    <>
      <Block
        className={styles.carousalRoot}
        {...(itemsProps.id ? { id: itemsProps.id } : {})}
      >
        <Block className={styles.carousalBody} ref={carousalBodyRef}>
          {itemsProps.items?.map((item: CarousalType, index: number) => {
            return (
              <Card
                key={`Car-${index}`}
                className={styles.card}
                data-type="carousal"
              >
                <CardContent>
                  <Block>
                    <Text
                      variant="kelly"
                      extend={{ textTransform: "uppercase", color: "gray" }}
                    >
                      {item.header.text}
                    </Text>
                    <Spacer />
                    <Text variant="amundsen">
                      {item.header.subText.primaryText}
                      {item.header.subText.secondaryText && (
                        <Text variant="columbus">
                          &nbsp;
                          {item.header.subText.secondaryText}
                        </Text>
                      )}
                    </Text>
                  </Block>
                  <Flex
                    title={item.header.subText.primaryText}
                    extend={thumbStyle(item.thumbnail)}
                  />
                  <Block
                    extend={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.footer.links &&
                      item.footer.links.map((link: any, index: number) => (
                        <Link
                          key={`link-${index}`}
                          tabIndex={0}
                          className={styles.learn}
                          href={link.url}
                          arrow="right"
                          onClick={(e: any) => e.preventDefault()} // We do not have any routing, hence blocking the action
                        >
                          {link.label}
                        </Link>
                      ))}
                  </Block>
                </CardContent>
              </Card>
            );
          })}
        </Block>
        <Block className={styles.bodyTypeBlock}>
          {notLargeScreen ? (
            <MobileCarousalButtons
              carousalCount={itemsProps.items?.length}
              carousalPos={carousalPos}
              moveCarousal={(shiftPx: number) =>
                scrollCarousal(0, shiftPx, true)
              }
            />
          ) : (
            itemsProps.items?.length * Constants.cardWidth >= width && (
              <NavButtons />
            )
          )}
        </Block>
      </Block>
    </>
  );
};

export default Carousal;
