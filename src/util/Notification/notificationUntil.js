import { notification } from 'antd';

// type : success, info, warning, error
export const showNotification = (type = 'success', message = 'Success', description = '') => {
    notification[type]({
        message,
        description
    });
};