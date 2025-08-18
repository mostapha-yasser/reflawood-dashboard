import { getAllProducts } from "@/service/apiRequest/productsApiRequest";
import { useQuery } from "@tanstack/react-query";
const useProduct = () => {
  const query = useQuery({
    queryKey: ["Products"],
    queryFn: () => getAllProducts(),
    
  });

  return query;
};

export default useProduct;
