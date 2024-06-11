import api from './token';

export const getAllNotifications = async (params) => {
  try {
    const response = await api.get('notification/get-all', {params});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await api.put('notification/mark-all-as-read');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const viewNotification = async (notificationId) => {
  try {
    const response = await api.get(`notification/view/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
