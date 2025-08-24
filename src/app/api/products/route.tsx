import { NextResponse } from "next/server";
import { ProductModel } from "../../../models/product";
import {  ProductInput } from "../../../types/product";
import { verifyJWT } from "@/lib/session";

export async function GET() {
  
  try {
   

    const productModel = await ProductModel.getInstance();
    await productModel.initIndexes?.();

    const products = await productModel.findAll();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {

  try {
    const productData: ProductInput = await request.json();

    if (
      !productData.name ||
      !productData.prices ||
      !productData.category ||
      !productData.description
    ) {
      return NextResponse.json({ error: "missing filed" }, { status: 400 });
    }
    const productModel = await ProductModel.getInstance();
    const product = await productModel.create(productData);

    return NextResponse.json({ product }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
