import { useActionState } from "react";
import ProductForm from "../products/ProductForm";
import ModelContainer from "./ModelContainer";
import { Product } from "@/types/product";
import { handleNewProduct } from "@/service/handelProductForm";
import { SquareX } from "lucide-react";

export default function EditModel({
  isModifyModelOpen,
  productBeforeEdit,
  toggleModifyModel
}: {
  isModifyModelOpen: boolean;
  productBeforeEdit: Product | undefined;
  toggleModifyModel: (product: Product | undefined) => void;
}) {
  const [state, handleNewProductAction] = useActionState(
    handleNewProduct,
    undefined
  );
  return (
    <ModelContainer isModelOpen={isModifyModelOpen}>
      <div className="relative flex justify-center    w-full p-5 scale-y-85 sm:scale-100">
        <div 
        onClick={()=>toggleModifyModel(undefined)}
        className="absolute  top-24 right-9 z-60 sm:top-6 sm:right-6 text-red-500  cursor-pointer">
          <SquareX size={30} />
        </div>


        <ProductForm
          toggleModifyModel={toggleModifyModel}
          productBeforeEdit={productBeforeEdit}
          handleNewProductAction={handleNewProductAction}
          headerContent={"Update"}
          state={state}
        />
      </div>
    </ModelContainer>
  );
}
