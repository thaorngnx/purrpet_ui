import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { ListCart } from "../../components/Cart/ListCart";

export const CartPage = () => {
  return (
    <>
      <HeaderCustomer />
      <ListCart />
      <FooterCustomer />
    </>
  );
};
