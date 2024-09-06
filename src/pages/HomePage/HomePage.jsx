import { useSelector } from "react-redux";

import { selectStatus, selectToken } from "../../redux/selectors.js";
import { Loader } from "../../components/Loader/Loader.jsx";
import { Hero } from "../../components/Hero/Hero.jsx";

export default function HomePage() {
  const status = useSelector(selectStatus);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div>
      <Hero />
    </div>
  );
}
