import { FormControl } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { RefundByAdmin, acceptRefund, rejectRefund } from "../../api/pay";
import { useNavigate } from "react-router-dom";
import { getOrderByCode } from "../../api/order";
import * as CONST from "../../constants";
import { useState } from "react";


export const Refund = ({ notification }) => {
    const navigate = useNavigate();
    const [refund, setRefund] = useState(false);
    const [statusRefund, setStatusRefund] = useState("");

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
    useEffect(() => {
        getOrderByCode(notification.orderCode).then((res) => {
           
           if(res.data.statusRefund  === CONST.STATUS_REFUND.WAITING)
           {
            setRefund(false);
            setStatusRefund(CONST.STATUS_REFUND.WAITING);
           }
           else{
            setRefund(true);
            setStatusRefund(res.data.statusRefund );
           }
        }
        )
    }, [notification]);
    const   handleRefund = () => {
        RefundByAdmin({
            orderCode: notification.orderCode,
        } ).then((res) => {
            navigate("/admin/order");
        });
    }
    return (
        <Box className="flex items-center justify-center bg-[#e5e7eb]  mt-5 m-[auto]">
            <FormControl className="form-control m-10">
                <h1 className="text-center text-2xl font-bold text-gray-900 mb-4">{notification.title}</h1>
                <h3 className="text-base font-bold text-gray-900 mb-2">Thông tin đơn hàng: {notification.orderCode}</h3>
                <h3 className="text-base font-bold text-gray-900 mb-2">Lý do hoàn tiền: {notification.message}</h3>
                <h3 className="text-base font-bold text-gray-900 mb-2 ">Hình ảnh:</h3>
                <Box className="flex flex-row mt-4">
                {
                    notification.image.map((image, index) => (
                        <img key={index} src={image} alt="Hình ảnh" className="h-[400px] w-auto m-2" />
                    ))
                }
                </Box>
                <Box className="flex flex-row mt-4">
                    {!refund ? <Box>
                        <Button className="mr-2" variant="contained" color="error" onClick={handleReject}>
                        TỪ CHỐI
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleAccept} >
                        ĐỒNG Ý
                    </Button></Box> : <Box>
                        <Button variant="contained" className="text-black" disabled = 'false'>
                        Đã xử lý
                    </Button>
                    
                    <Button variant="contained" color="primary" className="text-black ml-3" onClick={handleRefund} disabled={
                        statusRefund === CONST.STATUS_REFUND.ACCEPT ? false : true
                    } >
                    {
                            statusRefund === CONST.STATUS_REFUND.CANCEL ? "Đã từ chối" :
                            statusRefund === CONST.STATUS_REFUND.ACCEPT ? "Hoàn tiền" :
                            "Đã Hoàn Tiền"
                    }
                    </Button>
                  
                    </Box>}
                </Box>
            </FormControl>
        </Box>
    );
};