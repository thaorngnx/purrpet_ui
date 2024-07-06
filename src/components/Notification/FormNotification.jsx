import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Box } from '@mui/material';
import { useStore } from '../../zustand/store';
import { useNotificationStore } from '../../zustand/notificationStore';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/noti.jpg';
import { Padding } from '@mui/icons-material';
import { useEffect } from 'react';
import { NOTIFICATION_TYPE } from '../../constants';
import { viewNotification } from '../../api/notification';

export const FormNotification = () => {
    const customer = useStore((state) => state.customerState.data);
    const { notificationState, getAllNotifications } = useNotificationStore();
    useEffect(() => {
        if(customer && customer.accessToken)
        {
            getAllNotifications();
        }else{
            return () => {
                // cleanup
            };
        }
    }
    , [customer]);

    const navigator = useNavigate();
    const handleViewNotification = (notification) => {
        viewNotification(notification._id);
        if (notification.type === NOTIFICATION_TYPE.ORDER) {
         
          navigator(`/order/${notification.orderCode}`);
         
        } else if (notification.type === NOTIFICATION_TYPE.BOOKING_SPA) {
          navigator(`/bookingSpa/${notification.orderCode}`);
         
        } else if (notification.type === NOTIFICATION_TYPE.BOOKING_HOME) {
          navigator(`/bookingHome/${notification.orderCode}`);
        }
      };

    return (
        <>
        <Box sx={{ minWidth:300, position: 'absolute', marginBottom:'-270px', paddingTop:'10px', zIndex:'1000000'}}>
      <Card variant="outlined">
        
      <React.Fragment>
      {!customer && (
      <Box height={280} display={'flex'} flexDirection={'column'} alignItems={'center'} margin={5} >
          <h1 sx={{ fontSize: 'xl', fontWeight:'bold' }}>  Vui lòng xác nhận tài khoản để có thể xem thông báo</h1>
         
            <Button
            onClick={()=>navigator('/lookup')}>
            Xác nhận
            </Button>
            <img src={img} alt="noti" width="50%" />
          
            </Box>)}
        { customer && (
            <Box >
            <CardContent>
            <Typography sx={{ fontSize: 'xl', fontWeight:'bold' }} color="black" gutterBottom>
          Thông Báo Mới Nhận
        </Typography>
        <Typography >
          {notificationState.data && notificationState.data.length === 0 && <h1>Không có thông báo mới</h1>}
        {notificationState.loading && <h1>Loading...</h1>}
        {notificationState.error && <h1>{notificationState.error}</h1>}
            
        {notificationState.data && notificationState.data.slice(0, 5).map((notification, index) => (
            <Box key={index}  sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                background: notification.seen ? 'white' : '#f4e9f1',
                padding: '5px',
                marginBottom: '1px'
              }}
              onClick={() => handleViewNotification(notification)}
              >
             <Typography sx={{ fontSize: 'lg', fontWeight:'bold' }} color="black" gutterBottom>
               {notification.title}
             </Typography>
             <Typography sx={{fontSize:'md'}}>
               {notification.message}
             </Typography>
            
           </Box>
         ))}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-end'>
        <Button size="small" 
        onClick={()=>navigator('/notification')}>Xem Thêm</Button>
      </CardActions>
      </Box>
    )}
    </React.Fragment></Card>
    </Box>
        </>
    )
};