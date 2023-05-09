import { faCircleCheck, faCircleExclamation, faCircleInfo, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from 'antd';

// type : success, info, warning, error
export const showNotification = (type = 'success', description = '') => {
    let bgColor, icon;
    switch (type) {
        case 'info':
            bgColor = 'var(--info)';
            icon = <FontAwesomeIcon icon={faCircleExclamation} />;
            break;
        case 'warning':
            bgColor = 'var(--warning)';
            icon = <FontAwesomeIcon icon={faCircleInfo} />;
            break;
        case 'error':
            bgColor = 'var(--error)';
            icon = <FontAwesomeIcon icon={faTriangleExclamation} />;
            break;
        default:
            bgColor = 'var(--success)';
            icon = <FontAwesomeIcon icon={faCircleCheck} />;
    }

    notification[type]({
        description,
        duration: 2,
        className: 'notification',
        style: {
            backgroundColor: bgColor,
        },
        icon,
        closeIcon: <FontAwesomeIcon icon={faXmark} />
    });
};