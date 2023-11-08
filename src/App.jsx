import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListCategory } from "./components/Category/ListCategory";
import { ListProduct } from "./components/Product/ListProduct";
import { CarouselImage } from "./components/Image/CarouselImage";
import { UploadImage } from "./components/Image/UploadImage";
import { ListSpa } from "./components/Spa/ListSpa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<UploadImage />} />
        </Route>
        <Route path="/admin">
          <Route index element={<ListCategory />} />
          <Route path="category" element={<ListCategory />} />
          <Route path="product" element={<ListProduct />} />
          <Route path="spa" element={<ListSpa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
