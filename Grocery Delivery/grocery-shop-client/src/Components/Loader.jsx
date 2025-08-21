import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextURL = query.get("next");

  useEffect(() => {
    if (nextURL) {
      setTimeout(() => {
        navigate(`/${nextURL}`);
      }, 3000);
    }
  }, [navigate, nextURL]);

  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner w-16 text-[#4fbf7a]"></span>
    </div>
  );
};

export default Loader;
