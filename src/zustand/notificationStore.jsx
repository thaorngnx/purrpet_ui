import { create } from "zustand";
import { getAllNotifications } from '../api/notification';

const notificationState = {
    loading: false,
    error: null,
    data: null,
};

// const NotificationStore = {
//     notificationState: NotificationState,
//     getAllNotifications: async () => {},
// };
export const notificationStore = (set, get) => ({
    notificationState,
    setNotificationState: (newState) => {
        set( (state) => {
            state.notificationState = newState;
        }, false, `notification/setNotificationState`);
    },
    getAllNotifications: (params) => {
        set(
            (state) => {
            state.notificationState.loading = true;
            },
            false,
            `notification/getAllNotifications_loading`,
        );
        getAllNotifications(params).then((res) => {
           if (res.err === 0) {
            set(
                (state) => {
                state.notificationState.loading = false;
                state.notificationState.data = res.data;
                state.notificationState.error = null;
                },
                false,
                `notification/getAllNotifications_success`,
            );
            }
            else {
                set(
                    (state) => {
                    state.notificationState.loading = false;
                    state.notificationState.error = res.message;
                    state.notificationState.data = null;
                    },
                    false,
                    `notification/getAllNotifications_error`,
                );
            }
        });
        
    }
    });

