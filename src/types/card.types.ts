export type TCard = {
  id: number;
  name: string;
  image: string;
  flipped: boolean;
  matched: boolean;
};

export type TCardList = TCard[];

export type TCardProps = {
  clickProp: (card: TCard) => void;
  card: TCard;
};
