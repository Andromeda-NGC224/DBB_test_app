import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import "./App.css";
import { lazy } from "react";
import { useSelector } from "react-redux";
import { selectFolders } from "../../redux/selectors.js";
import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute.jsx";

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
  const items = useSelector(selectFolders);
  console.log(items);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/folders"
          element={
            <PrivateRoute>
              <FoldersPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/folders/:id"
          element={
            <PrivateRoute>
              <FoldersPageDetails />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/redirect" element={<RedirectPage />}></Route>
      </Routes>
    </Layout>
  );
}
