import { create } from "zustand";
import { getAllNotifications } from '../api/notification';

const NotificationState = {
    loading: false,
    error: null,
    data: null,
    };

const NotificationStore = {
    notificationState: NotificationState,
    getAllNotifications: async () => {},
};
 export const useNotificationStore = create((set, get) => ({
    ...NotificationStore,
   
    getAllNotifications: async () => {
        set({
        notificationState: {
            ...get().notificationState,
            loading: true,
        },
        });
        try {
        const res = await getAllNotifications();
        set({
            notificationState: {
            loading: false,
            error: '',
            data: res.data,
            },
        });
        } catch (error) {
        set({
            notificationState: {
            loading: false,
            error: error,
            data: {},
            },
        });
        }
    },
    }));

