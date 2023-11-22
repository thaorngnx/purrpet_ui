import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListCategory } from "./components/Category/ListCategory";
import { ListProduct } from "./components/Product/ListProduct";
import { CarouselImage } from "./components/Image/CarouselImage";
import { UploadImage } from "./components/Image/UploadImage";
import { ListSpa } from "./components/Spa/ListSpa";
import { Login } from "./components/Account/Login";
import { ListAccount } from "./components/Account/ListAccount";
import { HeaderAdmin } from "./components/Header/HeaderAdmin";
import { HeaderCustomer } from "./components/Header/HeaderCustomer";
import { Dashboard } from "./pages/Admin/Dashboard";
import { Category } from "./pages/Admin/Category";
import { Product } from "./pages/Admin/Product";
import { Spa } from "./pages/Admin/Spa";
import { Account } from "./pages/Admin/Account";
import { Homestay } from "./pages/Admin/Homestay";
import { MasterData } from "./pages/Admin/MasterData";
import { BookingSpaForm } from "./components/Booking/BookingSpaForm";
import { BookingHomeForm } from "./components/Booking/BookingHomeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HeaderCustomer />} />
          <Route path="booking/spa" element={<BookingSpaForm />} />
          <Route path="booking/home" element={<BookingHomeForm />} />
        </Route>
        <Route path="/admin">
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="category" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="spa" element={<Spa />} />
          <Route path="account" element={<Account />} />
          <Route path="homestay" element={<Homestay />} />
          <Route path="masterData" element={<MasterData />} />
          <Route path="x/category" element={<ListCategory />} />
          <Route path="x/product" element={<ListProduct />} />
          <Route path="x/spa" element={<ListSpa />} />
          <Route path="x/account" element={<ListAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
