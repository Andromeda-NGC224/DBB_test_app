import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import "./App.css";
import { lazy } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const RedirectPage = lazy(() =>
  import("../../pages/RedirectPage/RedirectPage.jsx")
);
const FoldersPage = lazy(() =>
  import("../../pages/FoldersPage/FoldersPage.jsx")
);
const FoldersPageDetails = lazy(() =>
  import("../../pages/FoldersPageDetails/FoldersPageDetails.jsx")
);

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/folders" element={<FoldersPage />}></Route>
        <Route path="/folders/:id" element={<FoldersPageDetails />}></Route>
        <Route path="/redirect" element={<RedirectPage />}></Route>
      </Routes>
    </Layout>
  );
}
