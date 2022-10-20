import { useEffect, useRef, useState } from "react";
import { Block, Flex, LoadingBar } from "vcc-ui";
import Constants from "../config/Constants";
import { Car } from "../model/CarModels";
import { useAxios } from "../utils/CustomHooks";
import { createCarousalItems } from "../utils/Utils.function";
import Carousal from "./carousal/Carousal";
import { CarousalType } from "./carousal/carousal.model";
import Error from "./Error";
import SelectBody from "./SelectBody";

const Main = () => {
  const headerRef = useRef<HTMLDataElement>(null);
  const [carousalItems, setCarousalItems] = useState<CarousalType[]>();
  const [selectedBodyType, setSelectedBodyType] = useState<string>();
  const { response, loading, error } = useAxios({
    endPoint: Constants.carApiEndPoint,
  });
  /*
    For better accessiability lets focus our Carousal
    */
  useEffect(() => {
    headerRef?.current?.focus();
  }, []);
  /*
    update car list on body type selection and when we received first response
  */
  useEffect(() => {
    const carList: Car[] = response?.filter((carData: Car) =>
      selectedBodyType ? carData.bodyType === selectedBodyType : carData
    );

    carList && setCarousalItems(() => createCarousalItems(carList));
  }, [response, selectedBodyType]);

  return (
    <>
      {loading && <LoadingBar isLoading={true} />}
      {response && (
        <Block ref={headerRef}>
          <Flex>
            <Block
              extend={{
                height: "0.5rem",
                backgroundColor: "#1c6bba",
                marginBottom: "0.25rem",
              }}
            />
            <SelectBody
              carList={response as Car[]}
              selectBodyType={(bodyType: string) =>
                setSelectedBodyType(bodyType)
              }
            />
            <Carousal
              id="car-carousal"
              items={carousalItems as CarousalType[]}
            />
          </Flex>
        </Block>
      )}
      {error && <Error error={error} />}
    </>
  );
};

export default Main;
