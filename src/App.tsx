import { ModelCreateProduct } from "./component/ModelCreateProduct";
import { Product } from "./pages/Product/Product";
import { User } from "./pages/User/User";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product" element={<Product />} />
        <Route path="/modal" element={<ModelCreateProduct open={false} />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
