import { Collection, Db, ObjectId, WithId } from "mongodb";
import { Product, ProductDB, ProductInput } from "../types/product";
import { connectToDatabase } from "../lib/mongodb";

export class ProductModel {
  private collection: Collection<ProductDB>;
  private static instance: ProductModel;

  private constructor(db: Db) {
    this.collection = db.collection<ProductDB>("products");
  }

  static async getInstance(): Promise<ProductModel> {
    if (!ProductModel.instance) {
      const { db } = await connectToDatabase("reflawood");
      ProductModel.instance = new ProductModel(db);
    }
    return ProductModel.instance;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.collection.find().toArray();
    return products.map(this.toResponse);
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.collection.findOne({ _id: new ObjectId(id) });
      return product ? this.toResponse(product) : null;
    } catch {
      return null;
    }
  }

  async create(productData: ProductInput): Promise<Product> {
    const now = new Date();
    const dbProduct: ProductDB = {
      _id: new ObjectId(),
      name: productData.name,
      description: productData.description,
      prices: productData.prices,
      category: productData.category,
      imageUrl: productData.imageUrl,
      createdAt: now,
      updatedAt: now,
      shortDesc: productData.shortDesc,
    };

    const result = await this.collection.insertOne(dbProduct);
    return this.toResponse({ ...dbProduct, _id: result.insertedId });
  }

  async update(
    id: string,
    productData: Partial<ProductInput>
  ): Promise<Product | null> {
    try {
      const objectId = new ObjectId(id);
      const updateDoc: Partial<ProductDB> = {
        updatedAt: new Date(),
      };

      // Add all the missing fields!
      if (productData.name !== undefined) updateDoc.name = productData.name;
      if (productData.description !== undefined)
        updateDoc.description = productData.description;
      if (productData.shortDesc !== undefined)
        updateDoc.shortDesc = productData.shortDesc; 
      if (productData.category !== undefined)
        updateDoc.category = productData.category;
      if (productData.imageUrl !== undefined)
        updateDoc.imageUrl = productData.imageUrl;
      if (productData.prices !== undefined)
        updateDoc.prices = productData.prices; 

      const result = await this.collection.findOneAndUpdate(
        { _id: objectId },
        { $set: updateDoc },
        { returnDocument: "after" }
      );

      return result ? this.toResponse(result) : null;
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch {
      return false;
    }
  }

  async initIndexes() {
    await this.collection.createIndex({
      name: "text",
      description: "text",
    });
  }

  private toResponse(dbProduct: WithId<ProductDB>): Product {
    return {
      _id: dbProduct._id.toString(),
      name: dbProduct.name,
      description: dbProduct.description,
      shortDesc: dbProduct.shortDesc,
      prices: dbProduct.prices,
      category: dbProduct.category,
      imageUrl: dbProduct.imageUrl,
      createdAt: dbProduct.createdAt,
      updatedAt: dbProduct.updatedAt,
    };
  }
}