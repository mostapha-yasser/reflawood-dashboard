import { ObjectId } from 'mongodb';
export interface Price {
  price: number;
  discount: number;
}
export interface Product {
  _id: string;
  name: string;
  prices: Price;
  category: "table" | "mirrors";
  shortDesc: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductDB {
  _id: ObjectId;
  name: string;
  prices: Price;
  category: "table" | "mirrors";
  shortDesc: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface ProductInput {
  _id:string | undefined
  name: string;
  prices: Price;
  category: "table" | "mirrors";
  shortDesc: string;
  description: string;
  imageUrl: string;

}

export interface ProductFormInterface {
  headerContent: string;
  productBeforeEdit: Product | undefined;
  handleNewProductAction: (payload: FormData) => void;
  state:
    | {
        errors: {
          name?: string[];
          imageUrl?: string[];
          price?: string[];        // These should match your Zod schema field names
          discount?: string[];     // These should match your Zod schema field names
          category?: string[];
          description?: string[];
          shortDesc?: string[];    // Added missing shortDesc
          _id?: string[];         
        };
        error?: undefined;
      }
    | {
        error: string;
        errors?: undefined;
      }
    | {
        success: boolean;        // Added success state
        errors?: undefined;
        error?: undefined;
      }
    | undefined;
  toggleModifyModel: (product: undefined) => void;
}