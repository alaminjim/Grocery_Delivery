import { assets } from "../../public/images/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img
        className="w-full hidden md:block"
        src={assets.bottom_banner_image}
        alt=""
      />
      <img
        className="w-full md:hidden"
        src={assets.bottom_banner_image_sm}
        alt=""
      />
    </div>
  );
};

export default BottomBanner;
