import { FormControl } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";
import { acceptRefund, rejectRefund } from "../../api/pay";
import { useNavigate } from "react-router-dom";


export const Refund = ({ notification }) => {
    const navigate = useNavigate();
    const parts = notification.message.split("+");
    const content = parts[0].trim();
    const bank = parts[1].trim();
    const bankNumber = parts[2].trim();
    const handleAccept = () => {
        acceptRefund({ orderCode: notification.orderCode }).then((res) => {
            navigate("/admin/order");
        });
    }
    const handleReject = () => {
       rejectRefund({ orderCode: notification.orderCode }).then((res) => {
        navigate("/admin/order");
        });
    }
    return (
        <Box className="flex items-center justify-center bg-[#e5e7eb] ml-[25%] mt-5">
            <FormControl className="form-control m-10">
                <h1 className="text-center text-2xl font-bold text-gray-900 mb-4">{notification.title}</h1>
                <h3 className="text-base font-bold text-gray-900 mb-2">Thông tin đơn hàng: {notification.orderCode}</h3>
                <h3 className="text-base font-bold text-gray-900 mb-2">Lý do hoàn tiền: {content}</h3>
                <h3 className="text-base font-bold text-gray-900 mb-2">Hình ảnh:</h3>
                <img src={notification.image[0] } alt="image" className="w-[40%]" />
                <h3 className="text-base font-bold text-gray-900 mt-4">Số tài khoản khách hàng: {bankNumber}</h3>
                <h3 className="text-base font-bold text-gray-900 mb-2">Ngân hàng: {bank}</h3>
                <Box className="flex flex-row mt-4">
                    <Button className="mr-2" variant="contained" color="error" onClick={handleReject}>
                        TỪ CHỐI
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleAccept} >
                        ĐỒNG Ý
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
};