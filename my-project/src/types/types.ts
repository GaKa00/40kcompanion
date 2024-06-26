 export type FeatureType = {
  title: string;
  text: string;
  image: string;

};

 export type Book = {
   map(arg0: (book: any) => void): unknown;
   id: number;
   title: string;
   author: string;
   pages?: number;
   desc?: string;
   link?: string;
   image: string;
   isFinished?: boolean;
   isReading?: boolean;
   tags?: string[]
 };

