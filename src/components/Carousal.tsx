import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Block,
  Card,
  CardContent,
  Flex,
  LoadingBar,
  Spacer,
  Text,
  Link,
} from "vcc-ui";
import Constants from "../config/Constants";
import { useAxios, useWindowResize } from "../CustomHooks";
import { Car } from "../model/CarModels";
import Error from "./Error";
import MobileCarousalButtons from "./MobilecarousalButtons";
import SelectBody from "./SelectBody";

const thumbStyle = (imageUrl: string) => {
  return {
    justifyContent: "center",
    padding: "1rem",
    background: `url(${Constants.imagePath}${imageUrl}) no-repeat center`,
    backgroundSize: "contain",
    height: "16rem",
  };
};

/*
    This is Carousal component, responsiable to load the Carousal depending on number of Car available in responce object.
    Depending the screen width it loads respective carousal nav buttons. Loading will be shown until we receive response from backend.
    On Error a basic error component will be shown. 
*/
const Carousal: React.FC = () => {
  const carousalBodyRef = useRef(null as any);
  const { response, loading, error } = useAxios({
    endPoint: Constants.carApiEndPoint,
  });
  const [carList, setCarList] = useState<Car[]>([]);
  const [notLargeScreen, setNotLargeScreen] = useState<boolean>(false);
  const [carousalPos, setCarousalPos] = useState<number>(0);
  const [selectedBodyType, setSelectedBodyType] = useState<string>();
  const { width } = useWindowResize();

  /*
    For better accessiability lets focus our Carousal
    */
  useEffect(() => {
    carousalBodyRef?.current?.focus();
  }, []);

  /*
    update car list on body type selection and when we received first response
  */
  useEffect(() => {
    setCarList(
      response?.filter((carData: Car) =>
        selectedBodyType ? carData.bodyType === selectedBodyType : carData
      )
    );
    setCarousalPos(0);
    carousalBodyRef?.current?.scroll({ left: 0, behavior: "smooth" });
  }, [response, selectedBodyType]);

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
    @param: flag as number : 1 for moving carousal towards right, 0 for left
    @param: shiftPx as number : this is the amount of scroll on each click depending on mobile and big-screen card width
    
    scrollCarousal: function use to scroll the carousal to left/right depending on respective navigation button.
   */
  const scrollCarousal = (
    flag: number,
    shiftPx: number = Constants.cardWidth
  ) => {
    const scrollObj = {
      left: flag
        ? carousalBodyRef?.current.scrollLeft + shiftPx
        : carousalBodyRef?.current.scrollLeft - shiftPx,
      behavior: "smooth",
    };
    carousalBodyRef?.current.scroll(scrollObj);
  };

  /*
      NavButtons is a React component to render left & right arrow for large screen
    */
  const NavButtons: React.FC = useCallback(() => {
    return (
      <Block className="navButtons">
        <Block
          as="button"
          tabIndex={0}
          className="left"
          onClick={() => scrollCarousal(0)}
        >
          <Image alt="left" src="/icons/chevron-circled.svg" layout="fill" />
        </Block>
        <Block
          as="button"
          tabIndex={0}
          className="right"
          onClick={() => scrollCarousal(1)}
        >
          <Image alt="right" src="/icons/chevron-circled.svg" layout="fill" />
        </Block>
      </Block>
    );
  }, []);

  return (
    <>
      {loading && <LoadingBar isLoading={true} />}
      {response && (
        <Block className="carousalRoot">
          <Block className="carousalBody" ref={carousalBodyRef}>
            {carList?.map((carData: Car, index: number) => {
              return (
                <Card key={`Car-${index}`} className="card">
                  <CardContent>
                    <Block>
                      <Text
                        variant="kelly"
                        extend={{ textTransform: "uppercase", color: "gray" }}
                      >
                        {carData.bodyType}
                      </Text>
                      <Spacer />
                      <Text variant="amundsen">
                        {carData.modelName}&nbsp;
                        <Text variant="columbus">{carData.modelType}</Text>
                      </Text>
                    </Block>
                    <Flex extend={thumbStyle(carData.imageUrl)} />
                    <Block
                      extend={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        textTransform: "uppercase",
                      }}
                    >
                      <Link
                        tabIndex={0}
                        className="learn"
                        href="/learn/"
                        arrow="right"
                      >
                        learn
                      </Link>
                      <Link
                        tabIndex={0}
                        className="shop"
                        href="/shop/"
                        arrow="right"
                      >
                        shop
                      </Link>
                    </Block>
                  </CardContent>
                </Card>
              );
            })}
          </Block>
          <Block className="bodyTypeBlock">
            {notLargeScreen && (
              <MobileCarousalButtons
                carousalCount={carList?.length}
                carousalPos={carousalPos}
                moveCarousal={(flag: number, shiftPx: number) =>
                  scrollCarousal(flag, shiftPx)
                }
              />
            )}
            <SelectBody
              carList={response as Car[]}
              selectBodyType={(bodyType: string) =>
                setSelectedBodyType(bodyType)
              }
            />
            {!notLargeScreen &&
              carList?.length * Constants.cardWidth >= width && <NavButtons />}
          </Block>
        </Block>
      )}
      {error && <Error error={error} />}
    </>
  );
};

export default Carousal;
