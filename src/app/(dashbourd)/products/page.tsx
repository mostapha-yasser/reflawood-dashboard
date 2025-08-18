"use client";

import ProductsTable from "@/components/products/ProductsTable";
import useProduct from "@/Hooks/useProducts";
import Loading from "../loading";

function Products() {
  const { data, isPending, error, isError } = useProduct();


  if (isError) {
    return (
      <p className="text-red-500 text-2xl pt-5 text-center w-full border-2 border-red-400">
        {error.message}
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col py-10 px-4 items-center md:px-10 ">
    
      {isPending ? <Loading /> : <ProductsTable products={data} />}
    </div>
  );
}

export default Products;
