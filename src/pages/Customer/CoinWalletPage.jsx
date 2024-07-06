import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { SideNavCustomerInfo } from "../../components/Nav/SideNavCustomerInfo";
import { Box } from "@mui/material";
import { CoinWallet } from "../../components/Customer/CoinWallet";


export const CoinWalletPage = () => {
    return (
        <>
        <HeaderCustomer />
        <Box className="flex flex-col md:flex-row">
          <SideNavCustomerInfo />
            <Box className="flex-grow">
              <CoinWallet />
            </Box>
        </Box>
        <FooterCustomer />
        </>
    );
};