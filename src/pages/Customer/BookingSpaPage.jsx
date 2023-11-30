import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { BookingSpaForm } from "../../components/Booking/BookingSpaForm";

export function BookingSpaPage() {
  return (
    <>
      <HeaderCustomer />
      <BookingSpaForm />
      <FooterCustomer />
    </>
  );
}
