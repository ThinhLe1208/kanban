import React from 'react';
import classNames from 'classnames/bind';

import styles from './ErrorMessage.module.scss';

const cx = classNames.bind(styles);

export default function ErrorMessage({ children }) {
    return (
        <div className={cx("wrapper")}>
            <p className={cx("content")}>{children}</p>
        </div>
    );
}
