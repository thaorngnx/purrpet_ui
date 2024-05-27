import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { BookingHomeDetail } from "../Booking/BookingHomeDetail";
import { BookingSpaDetail } from "../Booking/BookingSpaDetail";


export const ResponeVNPAY = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    // Lấy giá trị response từ query parameters
    const searchParams = new URLSearchParams(location.search);
    const responseData = JSON.parse(decodeURIComponent(searchParams.get('response')));
    const isCustomer = searchParams.get('isCustomer') === 'true';
  
    console.log('Response from backend:', responseData);
  
    const handleBackToHome = () => {
      if (isCustomer) {
        navigate('/home');
      } else {
        navigate('/staff');
      }
    };
    return (
        <Box>
            <Typography variant="h4" align="center">
               KẾT QUẢ THANH TOÁN VNPAY
            </Typography>
            <Typography variant="h6" align="center">
               Đơn hàng: {responseData.orderCode}
            </Typography>
            <Typography variant="h6" align="center">
                Trạng thái: {responseData.Message}
            </Typography>
                <Button variant="contained" color="primary" onClick={handleBackToHome}>
                        Back to Home
                </Button>
        </Box>
       
        
    );
}