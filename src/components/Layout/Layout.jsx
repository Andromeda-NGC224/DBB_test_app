// import Header from "../Header/Header.jsx";
import { Toaster } from "react-hot-toast";
import { Loader } from "../Loader/Loader.jsx";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <Suspense fallback={<Loader />}>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </Suspense>
  );
}
