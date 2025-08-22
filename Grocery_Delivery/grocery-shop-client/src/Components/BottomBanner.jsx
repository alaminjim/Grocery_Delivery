import { assets, features } from "../../public/images/assets";

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
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#4fbf7a] mb-6">
          Why We Are the Best?
        </h1>
        <div>
          {features.map((feature, idx) => (
            <div className="flex items-center gap-4 mt-2" key={idx}>
              <img
                className="md:w-11 w-9"
                src={feature.icon}
                alt={feature.title}
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
