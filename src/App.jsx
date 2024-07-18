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
import { NotificationPage } from "./pages/Customer/NotificationPage";
import { OrderAdmin } from "./pages/Admin/OrderAdmin";
import { OrderDetailAdmin } from "./pages/Admin/OrderDetailAdmin";
import { BookingSpaAdmin } from "./pages/Admin/BookingSpaAdmin";
import { BookingSpaDetailAdmin } from "./pages/Admin/BookingSpaDetailAdmin";
import { BookingHomeAdmin } from "./pages/Admin/BookingHomeAdmin";
import { BookingHomeDetailAdmin } from "./pages/Admin/BookingHomeDetailAdmin";
import { NotificationAdmin } from "./pages/Admin/NotificationAdmin";
import { OrderStaff } from "./pages/Staff/OrderStaff";
import { OrderDetailStaff } from "./pages/Staff/OrderDetailStaff";
import { BookingSpaStaff } from "./pages/Staff/BookingSpaStaff";
import { BookingSpaDetailStaff } from "./pages/Staff/BookingSpaDetailStaff";
import { BookingHomeStaff } from "./pages/Staff/BookingHomeStaff";
import { BookingHomeDetailStaff } from "./pages/Staff/BookingHomeDetailStaff";
import { ProtectedAdminRoutes } from "./ProtectedAdminRoutes";
import { ProtectedCustomerRoutes } from "./ProtectedCustomerRoutes";
import { ProtectedStaffRoutes } from "./ProtectedStaffRoutes";
import { CreateOrder } from "./pages/Staff/CreateOrder";
import { CreateBookingHome } from "./pages/Staff/CreateBookingHome";
import { CreateBookingSpa } from "./pages/Staff/CreateBookingSpa";
import { useEffect } from "react";
import { useStore } from "./zustand/store";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";
import * as CONST from "./constants";
import { NotificationStaff } from "./pages/Staff/NotificationStaff";
import { RefundProcessing } from "./pages/Admin/RefundProcessing";
import { Comsignment } from "./pages/Admin/Comsignment";
import { Supplier } from "./pages/Admin/Supplier";
import { CoinWalletPage } from "./pages/Customer/CoinWalletPage";
import { HorizontalSlider } from "./components/Slider/HorizontalSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SpendingStatisticsPage } from "./pages/Customer/SpendingStatisticsPage";
import { ScrollToTop } from "./components/Button/ScrollToTop";
import { FavoriteProductPage } from "./pages/Customer/FavoriteProductPage";
import { getFavorite } from "./api/favorite";

function App() {
  const {
    getCart,
    getActiveCategories,
    getCustomerById,
    getFavorite,
    cartState,
    activeProductCategoryState,
    customerState,
    getAllNotifications,
  } = useStore();

  //get cart
  useEffect(() => {
    getCart();
    getActiveCategories();
    getAllNotifications();
    
    const accessToken = Cookie.get(
      import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN,
      { path: "/" },
    );
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (decoded.role === CONST.ROLE.CUSTOMER) {
        getCustomerById(decoded.id);
        getFavorite();
      }
    }
  }, [getCart, getActiveCategories, getCustomerById, getFavorite, getAllNotifications]);

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
      <ScrollToTop />
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
            <Route path="spending" element={<SpendingStatisticsPage />} />
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
            <Route path="notification" element={<NotificationPage />} />
            <Route path="wallet" element={<CoinWalletPage />} />
            <Route path="favorite" element={<FavoriteProductPage />} />
          </Route>
          <Route path="test" element={<HorizontalSlider />} />
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
            <Route path="order" element={<OrderAdmin />} />
            <Route path="order/:orderCode" element={<OrderDetailAdmin />} />
            <Route path="bookingSpa" element={<BookingSpaAdmin />} />
            <Route path="notification" element={<NotificationAdmin />} />
            <Route path="consignment" element={<Comsignment />} />
            <Route path="supplier" element={<Supplier />} />
            <Route
              path="refundProcessing/:orderCode"
              element={<RefundProcessing />}
            />
            <Route
              path="bookingSpa/:bookingSpaCode"
              element={<BookingSpaDetailAdmin />}
            />
            <Route path="bookingHome" element={<BookingHomeAdmin />} />
            <Route
              path="bookingHome/:bookingHomeCode"
              element={<BookingHomeDetailAdmin />}
            />
          </Route>
        </Route>
        <Route path="/staff">
          <Route path="login" element={<LoginStaff />} />
          <Route element={<ProtectedStaffRoutes />}>
            <Route index element={<CreateOrder />} />
            <Route path="notification" element={<NotificationStaff />} />
            <Route path="create/order" element={<CreateOrder />} />
            <Route path="create/bookingSpa" element={<CreateBookingSpa />} />
            <Route path="create/bookingHome" element={<CreateBookingHome />} />
            <Route path="order" element={<OrderStaff />} />
            <Route path="order/:orderCode" element={<OrderDetailStaff />} />
            <Route
              path="refundProcessing/:orderCode"
              element={<RefundProcessing />}
            />
            <Route path="bookingSpa" element={<BookingSpaStaff />} />
            <Route
              path="bookingSpa/:bookingSpaCode"
              element={<BookingSpaDetailStaff />}
            />
            <Route path="bookingHome" element={<BookingHomeStaff />} />
            <Route
              path="bookingHome/:bookingHomeCode"
              element={<BookingHomeDetailStaff />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
