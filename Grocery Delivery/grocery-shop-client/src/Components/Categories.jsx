import { useNavigate } from "react-router-dom";
import { categories } from "../../public/images/assets";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-14">
      <p className="text-2xl md:text-3xl font-medium text-gray-700">
        Categories
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/all-product/${category.path.toLocaleLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              className="group-hover:scale-108 transition max-w-28"
              src={category.image}
              alt=""
            />
            <p className="text-sm font-medium text-gray-800">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
