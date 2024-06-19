import React from 'react';
import { useStore } from '../../zustand/store';
import { useEffect, useCallback } from 'react';
import { Box, Button, Pagination } from '@mui/material';
import { NOTIFICATION_TYPE } from '../../constants';
import { getAllNotifications, markAllAsRead, viewNotification } from '../../api/notification';
import { useNavigate } from 'react-router-dom';
import { formatTimeToNow } from '../../utils/formatData';
import { useState } from 'react';


export const Notification = ()=>
{
  const customer = useStore((state) => state.customerState.data);
  const [notificationState, setNotificationState] = useState({loading: false, error: null, data: null});
  const [pagination, setPagination] = useState('');
  const [page, setPage] = useState(1);
  const navigateTo = useNavigate();
    useEffect(() => {
      
       if(customer && customer.accessToken)
        {
          const params = {
            page: page,
            limit: 10,
          };
          getAllNotifications(params).then((res) => {
            setNotificationState({loading: false, error: null, data: res.data});
            setPagination(res.pagination);
          }).catch((error) => {
            setNotificationState({loading: false, error: error, data: null});
          }
          );
        }else{
          return () => {
            // cleanup
          };
        }
    }, [customer]);

    const handleViewNotification = (notification) => {
      viewNotification(notification._id);
      if (notification.type === NOTIFICATION_TYPE.ORDER) {
       
        navigateTo(`/order/${notification.orderCode}`);
       
      } else if (notification.type === NOTIFICATION_TYPE.BOOKING_SPA) {
        navigateTo(`/bookingSpa/${notification.orderCode}`);
        
      } else if (notification.type === NOTIFICATION_TYPE.BOOKING_HOME) {
        navigateTo(`/bookingHome/${notification.orderCode}`);
      }
    };
    const handleViewAll = () => {
      markAllAsRead();
      window.location.reload();
    }
    return(
      <>
      <Box className="flex flex-col w-full m-10">
     
        {notificationState.loading && <h1>Loading...</h1>}
        {notificationState.error && <h1>{notificationState.error}</h1>}
         <Box className="text-end font-bold text-[#000000]  p-3" >
            <Button onClick={()=>handleViewAll()}>
        {notificationState.data  ? 'Đánh dấu tất cả đã đọc' : 'Không có thông báo'}
            </Button>
          </Box>
        {notificationState.data && notificationState.data.map((item, index) => (
          <Box key={index} className={`flex flex-col border-2 ${item.seen ? 'bg-white' : 'bg-[#e3b8b8]'}`}>
            <Box className=" m-3 flex flex-row justify-between " >
            <h3 className="text-center text-xl font-bold text-[#000000]">{item.title}</h3>
            <Button onClick={()=>handleViewNotification(item)}>
              Xem chi tiết
            </Button>
              </Box>
           
            <p  className=" ml-5 mb-3 ">{item.message}</p>
            <p className=" ml-5 mb-3 ">{ formatTimeToNow(item.createdAt)}</p>
          </Box>
        ))}
        {
          !customer && 
          <Box className="flex flex-col items-center">
            <h1>Bạn cần đăng nhập để xem thông báo</h1>
            <Button onClick={()=>navigateTo('/lookup')}>Xác thực tài khoản</Button>
          </Box>
        }
         <Box className="flex justify-end mt-2">
       {pagination.total > 0 &&  <Pagination color="secondary" count={pagination.total} page={page} onChange={(event, value) => setPage(value)} />}
          </Box>
      </Box>
      </>
    )
}