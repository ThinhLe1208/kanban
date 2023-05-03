import React from 'react';
import { Breadcrumb } from 'antd';
import classNames from 'classnames/bind';

import styles from './Breadcrumbs.module.scss';

const cx = classNames.bind(styles);

export default function Breadcrumbs({ items }) {
    return (
        <Breadcrumb
            className={cx("breadcrumbs")}
            items={items}
            separator=">"
        />
    );
}
