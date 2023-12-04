import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { OrderDetail } from "../../components/Order/OrderDetail";

export const OrderDetailPage = () => {
  return (
    <>
      <HeaderCustomer />
      <OrderDetail />
      <FooterCustomer />
    </>
  );
};
