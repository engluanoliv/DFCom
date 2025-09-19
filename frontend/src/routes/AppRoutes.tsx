import ProductDetailsPage from "@/pages/ProductDetailsPage";
import ProductsPage from "@/pages/ProductsPage";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>
    </>
  );
}
