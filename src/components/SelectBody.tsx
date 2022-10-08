import { useEffect, useState } from "react";
import { Block, SelectInput } from "vcc-ui";
import { Car, SelectBodyType } from "../model/CarModels";

const SelectBody: React.FC<SelectBodyType> = (carList: SelectBodyType) => {
  const [value, setValue] = useState<string>("");
  const [bodyTypes, setBodyTypes] = useState<string[]>();

  const uniqueBodyTypes = (carList: Car[]) => {
    const bodyTypes = carList.map((car: Car) => car.bodyType);
    return [
      ...new Set(bodyTypes.map((bodyType: string) => JSON.stringify(bodyType))),
    ].map((bodyType: string) => JSON.parse(bodyType));
  };

  useEffect(() => {
    setBodyTypes(() => uniqueBodyTypes(carList.carList));
  }, [carList]);

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
