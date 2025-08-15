import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import ProductCard from "../Components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();

  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterProducts(
        products.filter((products) =>
          products.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilterProducts(products);
    }
  }, [searchQuery, products]);
  return (
    <div className="mt-24 flex flex-col ml-32">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl uppercase font-medium">All products</p>
        <div className="w-16 h-0.5 bg-[#4fbf7a] rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filterProducts
          .filter((product) => product.inStock)
          .map((product, idx) => (
            <ProductCard key={idx} product={product}></ProductCard>
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
