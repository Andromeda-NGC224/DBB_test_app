import { Toaster } from "react-hot-toast";
import { Loader } from "../Loader/Loader.jsx";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchContent } from "../../redux/operations.js";
import Header from "../Header/Header.jsx";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContent(""));
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Header />

      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </Suspense>
  );
}
