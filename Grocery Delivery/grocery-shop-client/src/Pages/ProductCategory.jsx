import React from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../../public/images/assets";
import ProductCard from "../Components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLocaleLowerCase() === category
  );
  const filterCategory = products.filter(
    (product) => product.category.toLocaleLowerCase() === category
  );
  return (
    <div className="mt-16 ml-32">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium ">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-[#4fbf8b] rounded-full"></div>
        </div>
      )}
      {filterCategory.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
          {filterCategory.map((product, idx) => (
            <ProductCard key={idx} product={product}></ProductCard>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-[#4fbf7a]">
            No Products found in this categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
