import client from "@/lib/queryClient";
import { deleteProduct } from "@/service/apiRequest/productsApiRequest";
import { useMutation } from "@tanstack/react-query";

const useDeleteProduct = () => {
  const query = useMutation({
    mutationFn:(id:string)=> deleteProduct(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["Products"],
      });
      
    },
  });
  return query;
};
export default useDeleteProduct;
