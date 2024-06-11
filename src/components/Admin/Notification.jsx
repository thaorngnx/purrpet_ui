import React from 'react';
import { useState } from 'react';
import { useNotificationStore } from '../../zustand/notificationStore';
import { useEffect, useCallback } from 'react';
import { Box, Button, Pagination } from '@mui/material';
import { NOTIFICATION_TYPE } from '../../constants';
import { markAllAsRead, viewNotification, getAllNotifications } from '../../api/notification';
import { useNavigate } from 'react-router-dom';
import { formatTimeToNow } from '../../utils/formatData';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import * as CONST from "../../constants";
import { el } from 'date-fns/locale';

export const Notification = ()=>
{
  const [notificationState, setNotificationState] = useState({loading: false, error: null, data: null});
  const [pagination, setPagination] = useState('');
  const [page, setPage] = useState(1);
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const accessToken = Cookies.get('access_token');
    useEffect(() => {
      const params = {
        page: page,
        limit: 10,
      };
          getAllNotifications(params).then((res) => {
            console.log(res);
            setNotificationState({loading: false, error: null, data: res.data});
            setPagination(res.pagination);
          }).catch((error) => {
            setNotificationState({loading: false, error: error, data: null});
          });
          if (accessToken) {
            const decoded = jwtDecode(accessToken);
    
            if (decoded.role === CONST.ROLE.ADMIN) {
              setLink('/admin');
             
            }
            else if (decoded.role === CONST.ROLE.STAFF) {
              setLink('/staff');
            }
            else {
              setLink('/');
            }
          }
       
    }, [ accessToken, page ]);
    
    
    const handleViewNotification = (notification) => {
      viewNotification(notification._id);
     
      if (notification.type === NOTIFICATION_TYPE.ORDER) {
        if(notification.action === CONST.NOTIFICATION_ACTION.REFUND_ORDER)
        {
          navigate(`${link}/refundProcessing/${notification.orderCode}`, { state: { notification: notification } });
        }else{
          navigate(`${link}/order/${notification.orderCode}`);
        }
       

      } else if (notification.type === NOTIFICATION_TYPE.BOOKING_SPA) {
        navigate(`${link}/bookingSpa/${notification.orderCode}`);

      } else if (notification.type === NOTIFICATION_TYPE.BOOKING_HOME) {
        navigate(`${link}/bookingHome/${notification.orderCode}`);
      }else if (notification.type === NOTIFICATION_TYPE.PRODUCT) {
        navigate(`${link}/consignment`);
      }
    };
    const handleViewAll = () => {
      markAllAsRead();
      window.location.reload();
    }
    
  
    return(
      <>
      <Box className="flex flex-col m-10">
     
        {notificationState.loading && <h1>Loading...</h1>}
        {notificationState.error && <h1>{notificationState.error}</h1>}
            <Box className="text-end font-bold text-[#000000]  p-3" >
            <Button onClick={()=>handleViewAll()}>
            Đánh dấu đã đọc tất cả
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
        <Box className="flex justify-end mt-2">
       {pagination &&  <Pagination color="secondary" count={pagination.total} page={page} onChange={(event, value) => setPage(value)} />}
          </Box>
      </Box>
      </>
    )
}