import BestSeller from "../Components/BestSeller";
import BottomBanner from "../Components/BottomBanner";
import Categories from "../Components/Categories";
import MainBanner from "../Components/MainBanner";

const Home = () => {
  return (
    <div className="mt-10">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <MainBanner></MainBanner>
        <Categories></Categories>
        <BestSeller></BestSeller>
        <BottomBanner></BottomBanner>
      </div>
    </div>
  );
};

export default Home;
