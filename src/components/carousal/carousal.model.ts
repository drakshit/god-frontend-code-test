
export type CarousalType = {
  id?: string;
  header: {
    text: string;
    subText: {
      primaryText: string;
      secondaryText?: string;
    };
  };
  thumbnail: string;
  footer: {
    links?: {
      url: string;
      label: string;
    }[];
  };
};
