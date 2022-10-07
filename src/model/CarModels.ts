export interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

export interface MobileViewCardCountType {
  carousalCount: number | undefined;
  carousalPos: number;
  moveCarousal: (flag: number, shiftPx: number) => void;
}

export interface SelectBodyType {
  carList: Car[];
  selectBodyType: (bodyType: string) => void;
}