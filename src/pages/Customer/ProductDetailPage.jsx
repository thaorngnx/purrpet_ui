import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { ProductDetail } from "../../components/Product/ProductDetail";
import { useParams } from "react-router-dom";

export const ProductDetailPage = () => {
  const { productCode } = useParams();
  return (
    <>
      <HeaderCustomer />
      <ProductDetail />
      <FooterCustomer />
    </>
  );
};
