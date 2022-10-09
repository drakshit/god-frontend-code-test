import { useEffect, useState } from "react";
import { Block, SelectInput } from "vcc-ui";
import { Car, SelectBodyType } from "../model/CarModels";

/*
SelectBody: This React component is use to render a select dropdown of unique bodyType.
On select a perticular one, Car list will gets filtered with selected bodyType and change the Carousal itms
*/
const SelectBody: React.FC<SelectBodyType> = (carList: SelectBodyType) => {
  const [value, setValue] = useState<string>("");
  const [bodyTypes, setBodyTypes] = useState<string[]>();

  useEffect(() => {
    setBodyTypes(() => uniqueBodyTypes(carList.carList));
  }, [carList]);

  /*
  @param: carList: Car[]
  uniqueBodyTypes() function accepts list of cars as an argument and find all unique bodyType within the list
  and return the same
  */
  const uniqueBodyTypes = (carList: Car[]): string[] => {
    const bodyTypes = carList.map((car: Car) => car.bodyType);
    return [
      ...new Set(bodyTypes.map((bodyType: string) => JSON.stringify(bodyType))),
    ].map((bodyType: string) => JSON.parse(bodyType));
  };

  /*
  @param: bodyType: string
  filterByBodyType() function accepts bodyType and filter the car list with matching bodyType and returns the list of cars
  */
  const filterByBodyType = (bodyType: string) => {
    setValue(bodyType);
    carList.selectBodyType(bodyType);
  };

  return (
    <Block className="bodyTypeContainer">
      <SelectInput
        tabIndex={0}
        className="bodyType"
        label={"Filter Cars by <body-type>"}
        value={value}
        onChange={(e: any) => filterByBodyType(e.target.value)}
        loading={bodyTypes?.length ? false : true}
      >
        {value && <option value="">All</option>}
        {bodyTypes &&
          bodyTypes.map((bodyType: string, index: number) => {
            return (
              <option key={`${bodyType}-${index}`} value={bodyType}>
                {bodyType}
              </option>
            );
          })}
      </SelectInput>
    </Block>
  );
};

export default SelectBody;
