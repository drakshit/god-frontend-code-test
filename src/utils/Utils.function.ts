import { CarousalType } from "../components/carousal/carousal.model";
import Constants from "../config/Constants";
import { Car } from "../model/CarModels";

/*
@param: carlist: Car[] This uitl function accepts a list of items (here it is Car list) and perse the object and create a new
list of Carousal type object. And finally returns the array of Carousal items which will be use to create the Carousal using
<Carousal /> component.
*/
export const createCarousalItems = (carList: Car[]): CarousalType[] => {
    const carousalItems: CarousalType[] = carList.map((car: Car) => {
      const carousalType: CarousalType = {
        id: car.id,
        header: {
          text: car.bodyType,
          subText: {
            primaryText: car.modelName,
            secondaryText: car.modelType,
          },
        },
        thumbnail: car.imageUrl,
        footer: {
          links: [
            {
              url: Constants.links[0].url + car.id,
              label: Constants.links[0].label,
            },
            {
              url: Constants.links[1].url + car.id,
              label: Constants.links[1].label,
            },
          ],
        },
      };
      return carousalType;
    });
    return carousalItems;
  };
