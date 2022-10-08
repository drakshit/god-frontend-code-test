
export type CarousalType = {
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
