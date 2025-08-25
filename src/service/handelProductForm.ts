import { z } from "zod";
import { createProduct, updateProduct } from "./apiRequest/productsApiRequest";
import { Product, ProductInput } from "@/types/product";
import { AxiosResponse } from "axios";
import client from "@/lib/queryClient";

const productSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .trim(),

  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(300, { message: "Description must be at most 300 characters" })
    .trim(),

  shortDesc: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters" })
    .max(100, { message: "Short description must be at most 100 characters" })
    .trim(),

  price: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid number greater than 0"
    })
    .transform((val) => Number(val)),

  discount: z
    .string()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100), {
      message: "Discount must be a number between 0 and 100"
    })
    .transform((val) => val === "" ? 0 : Number(val)),

  imageUrl: z
    .string()
    .min(1, { message: "Image URL is required" })
    .url({ message: "Image URL must be a valid URL" })
    .trim(),

  galleryImage1: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Gallery Image 1 must be a valid URL if provided"
    }),

  galleryImage2: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Gallery Image 2 must be a valid URL if provided"
    }),

  galleryImage3: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Gallery Image 3 must be a valid URL if provided"
    }),

  category: z
    .string()
    .min(1, { message: "Category is required" })
    .trim(),
});

export async function handleNewProduct(prevState: unknown, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData);
    const validation = productSchema.safeParse(rawData);
  
    if (validation.success) {
      const rawFormData = validation.data;
      
      // Process gallery images - filter out empty strings
      const galleryImages = [
        rawFormData.galleryImage1 || "",
        rawFormData.galleryImage2 || "",
        rawFormData.galleryImage3 || ""
      ].filter(img => img.trim() !== "");

      const productData: ProductInput = {
        name: rawFormData.name,
        description: rawFormData.description,
        prices: {
          price: rawFormData.price,     
          discount: rawFormData.discount 
        },
        shortDesc: rawFormData.shortDesc, 
        imageUrl: rawFormData.imageUrl,
        galleryImages: galleryImages, // Add processed gallery images
        _id: rawFormData._id,
        category: rawFormData.category === "mirrors" ? "mirrors" : "table",
      };

      let result: AxiosResponse<{ product: Product } | null>;

      if (rawFormData._id) {
        result = await updateProduct(productData, rawFormData._id);
      } else {
        result = await createProduct(productData);
      }

      if (result.data && result.data.product) {
        client.invalidateQueries({ queryKey: ["Products"] });
        return { success: true };
      } else {
        return { error: "Failed to process product" };
      }
    } else {
      return {
        errors: validation.error.flatten().fieldErrors,
      };
    }
  } catch (error) {
    console.error('Product operation failed:', error);
    return { error: `Failed to process product` };
  }
}