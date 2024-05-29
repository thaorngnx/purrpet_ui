import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { FooterCustomer } from "../../components/Footer/FooterCustomer";
import { HeaderCustomer } from "../../components/Header/HeaderCustomer";
import { SideNavCustomerInfo } from "../../components/Nav/SideNavCustomerInfo";
import { getSpendingStatistic } from "../../api/pay";
import { VerticalBarChart } from "../../components/Chart/VerticalBarChart";
import { FormControl } from "@mui/material";
import { useStore } from "../../zustand/store";
import { formatCurrency } from "../../utils/formatData";
import { Card, CardContent, Typography } from "@mui/material";

export const SpendingStatisticsPage = () => {
    const [spending, setSpending] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const customer = useStore((state) => state.customerState.data);

   
   useEffect(() => {
    getSpendingStatistic().then((res) => {
        setSpending(res.data);
        setTotal(res);
        
        });
   }, []);
 
    const labels = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const monthStr = String(month).padStart(2, '0');
        return `${monthStr}`;
        });

   const data = {
     labels: labels,
     datasets: [
       {
         label: 'Đơn hàng',
         data: labels.map(month => {
            const order = spending.order?.[month];
            return order?.total || 0;
          }),
          count : labels.map(month => {
            const order = spending.order?.[month];
            return order?.count || 0;
            }),
         backgroundColor: 'rgba(255, 99, 132, 0.2)',
         borderColor: 'rgba(255, 99, 132, 1)',
         borderWidth: 1,
       },
       {
         label: 'Đặt lịch spa',
         data: labels.map(month =>{
            const bookingData = spending.bookingSpa?.[month];
            return bookingData?.total || 0;
          }),
          count : labels.map(month => {
            const bookingData = spending.bookingSpa?.[month];
            return bookingData?.count || 0;
            }),
         backgroundColor: 'rgba(54, 162, 235, 0.2)',
         borderColor: 'rgba(54, 162, 235, 1)',
         borderWidth: 1,
       },
       {
         label: 'Đăt phòng Homestay',
         data: labels.map(month => {
            const booking = spending.bookingHotel?.[month];
            return booking?.total || 0;
          }),
        count: labels.map(month => {
            const booking = spending.bookingHotel?.[month];
            return booking?.count || 0;
          }),
         backgroundColor: 'rgba(255, 206, 86, 0.2)',
         borderColor: 'rgba(255, 206, 86, 1)',
         borderWidth: 1,
       },
     ],
   };
   console.log('spending', spending)
    return (
        <>
        <HeaderCustomer />
        <Box className="flex flex-row justify-normal bg-[#eee]">
          <SideNavCustomerInfo />
          <Box className="w-full p-5">
           
            <Box>
                <Card className="bg-white shadow-md rounded-md">
                <CardContent className="p-6">
                    <Typography variant="h5" component="h1" className="font-bold mb-4">
                    Thông tin khách hàng
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                    <strong>Tên:</strong> {customer?.name}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                    <strong>Email:</strong> {customer?.email}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                    <strong>Điểm tích lũy:</strong> {formatCurrency(customer?.point)}
                    </Typography>
                  <Box className="flex flex-row justify-between">
                    <FormControl className="w-1/2">
                    <Typography variant="body1" className="mb-2">
                    <strong>Tổng chi tiêu cho đơn hàng đơn hàng:</strong> {formatCurrency(total?.totalOrder)}/ {total?.countOrder} đơn
                    </Typography>
                    </FormControl>
                    <FormControl className="w-1/2">
                    <Typography variant="body1" className="mb-2">
                    <strong>Tổng chi tiêu cho đặt lịch Spa:</strong> {formatCurrency(total?.totalBookingSpa)}/ {total?.countBookingSpa} đơn
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                    <strong>Tổng chi tiêu cho đặt phòng Homestay:</strong> {formatCurrency(total?.totalBookingHotel)}/ {total?.countBookingHotel} đơn
                    </Typography>
                    </FormControl>
                  </Box>
                  <Typography variant="body1" className="mb-2 text-[#fb3b47]">
                    <strong>Tổng Cộng:</strong> {formatCurrency(total?.total)}
                    </Typography>
                </CardContent>
                </Card>

            </Box>
        <VerticalBarChart data={data}/>
     
        </Box>
        </Box>
        <FooterCustomer />
        </>
    );
    }