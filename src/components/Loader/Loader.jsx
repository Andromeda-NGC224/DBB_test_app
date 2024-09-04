import { Rings } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Rings
      visible={true}
      height="80"
      width="80"
      color="rgb(255, 201, 121)"
      ariaLabel="rings-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
