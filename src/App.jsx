import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginAdmin } from "./components/Account/LoginAdmin";
import { LoginStaff } from "./components/Account/LoginStaff";
import { Dashboard } from "./pages/Admin/Dashboard";
import { Category } from "./pages/Admin/Category";
import { Product } from "./pages/Admin/Product";
import { Spa } from "./pages/Admin/Spa";
import { Account } from "./pages/Admin/Account";
import { Homestay } from "./pages/Admin/Homestay";
import { MasterData } from "./pages/Admin/MasterData";
import { ProductDetailPage } from "./pages/Customer/ProductDetailPage";
import { ProductPage } from "./pages/Customer/ProductPage";
import { CartPage } from "./pages/Customer/CartPage";
import { HomePage } from "./pages/Customer/HomePage";
import { IntroductionPage } from "./pages/Customer/IntroductionPage";
import { LookUpOrderPage } from "./pages/Customer/LookUpOrderPage";
import { CustomerInfoPage } from "./pages/Customer/CustomerInfoPage";
import { OrderHistoryPage } from "./pages/Customer/OrderHistoryPage";
import { HomestayPage } from "./pages/Customer/HomestayPage";
import { SpaPage } from "./pages/Customer/SpaPage";
import { BookingHomePage } from "./pages/Customer/BookingHomePage";
import { BookingSpaPage } from "./pages/Customer/BookingSpaPage";
import { OrderDetailPage } from "./pages/Customer/OrderDetailPage";
import { BookingSpaDetailPage } from "./pages/Customer/BookingSpaDetailPage";
import { BookingHomeDetailPage } from "./pages/Customer/BookingHomeDetailPage";
import { ManageOrder } from "./pages/Staff/ManageOrder";
import { Order } from "./pages/Admin/Order";
import { BookingSpa } from "./pages/Admin/BookingSpa";
import { BookingHome } from "./pages/Admin/BookingHome";
import { ProtectedAdminRoutes } from "./ProtectedAdminRoutes";
import { ProtectedCustomerRoutes } from "./ProtectedCustomerRoutes";
import { ProtectedStaffRoutes } from "./ProtectedStaffRoutes";
import { CreateOrder } from "./pages/Staff/CreateOrder";
import { DetailOrder } from "./pages/Staff/DetailOrder";
import { CreateBookingHome } from "./pages/Staff/CreateBookingHome";
import { useEffect } from "react";
import { useStore } from "./zustand/store";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";
import * as CONST from "./constants";

function App() {
  const {
    getCart,
    getActiveCategories,
    getCustomerById,
    cartState,
    activeProductCategoryState,
    customerState,
  } = useStore();

  //get cart
  useEffect(() => {
    getCart();
    getActiveCategories();
    const accessToken = Cookie.get(
      import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN,
      { path: "/" },
    );
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (decoded.role === CONST.ROLE.CUSTOMER) {
        getCustomerById(decoded.id);
      }
    }
  }, [getCart, getActiveCategories, getCustomerById]);

  if (activeProductCategoryState.loading || customerState.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="introduction" element={<IntroductionPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="product/:productCode" element={<ProductDetailPage />} />
          <Route path="service/spa" element={<SpaPage />} />
          <Route path="service/homestay" element={<HomestayPage />} />
          <Route path="booking/spa" element={<BookingSpaPage />} />
          <Route path="booking/home" element={<BookingHomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="lookup" element={<LookUpOrderPage />} />
          <Route element={<ProtectedCustomerRoutes />}>
            <Route path="customer" element={<CustomerInfoPage />} />
            <Route path="order" element={<OrderHistoryPage />} />
            <Route path="order/:orderCode" element={<OrderDetailPage />} />
            <Route
              path="bookingSpa/:bookingSpaCode"
              element={<BookingSpaDetailPage />}
            />
            <Route
              path="bookingHome/:bookingHomeCode"
              element={<BookingHomeDetailPage />}
              
            />
          </Route>
        </Route>
        <Route path="/admin">
          <Route path="login" element={<LoginAdmin />} />
          <Route element={<ProtectedAdminRoutes />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
            <Route path="spa" element={<Spa />} />
            <Route path="account" element={<Account />} />
            <Route path="homestay" element={<Homestay />} />
            <Route path="masterData" element={<MasterData />} />
            <Route path="order" element={<Order />} />
            <Route path="bookingSpa" element={<BookingSpa />} />
            <Route path="bookingHome" element={<BookingHome />} />
          </Route>
        </Route>
        <Route path="/staff">
          <Route path="login" element={<LoginStaff />} />
          <Route element={<ProtectedStaffRoutes />}></Route>
          <Route path="createOrder" element={<CreateOrder />}/>
          <Route path="order" element={<ManageOrder/>} />
          <Route path="order/:orderCode" element={<DetailOrder/>} />
          <Route path="createBookingHome" element={< CreateBookingHome/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
