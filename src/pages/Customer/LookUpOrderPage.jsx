import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { LookUpOrderForm } from "../../components/Order/LookUpOrderForm";
import { Box } from "@mui/material";

export const LookUpOrderPage = () => {
  return (
    <Box>
      <HeaderCustomer />
      <LookUpOrderForm />
      <FooterCustomer />
    </Box>
  );
};
