import { ReactNode } from "react";

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

 export interface BookDetailModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

 export type User = {

   
   id:number;
   username:String  ;
   email: string  
   password: string;
   createdAt: string; 
   readingList:[];
  }

  export type ReadingList = {
    id:number;
  isFinished:boolean;
  isReading:boolean;
  rating?: number;
  quotes?: string;
  summary?: string;
  addedAt:string;
  book:Book

  }


   export interface TagContextType {
     tag: string;
     setTag: React.Dispatch<React.SetStateAction<string>>;
   }

    export interface TagProviderProps {
     children: ReactNode;
   }


    export interface bookProp {
     data: Book[];
     openModal: (book: Book) => void;
   }


 