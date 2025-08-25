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
  galleryImages: string[];
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
  galleryImages: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  _id: string | undefined;
  name: string;
  prices: Price;
  category: "table" | "mirrors";
  shortDesc: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
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
          galleryImages?: string[]; // Added gallery images validation
          price?: string[];
          discount?: string[];
          category?: string[];
          description?: string[];
          shortDesc?: string[];
          _id?: string[];         
        };
        error?: undefined;
      }
    | {
        error: string;
        errors?: undefined;
      }
    | {
        success: boolean;
        errors?: undefined;
        error?: undefined;
      }
    | undefined;
  toggleModifyModel: (product: undefined) => void;
}