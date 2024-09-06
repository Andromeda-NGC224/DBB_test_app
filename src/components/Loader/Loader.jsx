import { Rings } from "react-loader-spinner";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loader}>
      <Rings
        visible={true}
        height="80"
        width="80"
        color="rgb(255, 201, 121)"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
