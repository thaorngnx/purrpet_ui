import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { BookingHomeForm } from "../../components/Booking/BookingHomeForm";

export function BookingHomePage() {
  return (
    <>
      <HeaderCustomer />
      <BookingHomeForm />
      <FooterCustomer />
    </>
  );
}
