 export type FeatureType = {
  title: string;
  text: string;
  image: string;

};

 export type Book = {
   id: number;
   title: string;
   author: string;
   pages?: number;
   desc?: string;
   image: string;
   isFinished?: boolean;
   isReading?: boolean;
   tags?: string[]
 };

