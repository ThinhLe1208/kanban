import React from 'react';
import { Breadcrumb, Divider } from 'antd';
import classNames from 'classnames/bind';

import styles from './Heading.module.scss';

const cx = classNames.bind(styles);

export default function Heading({ breadCrumbList, title }) {
    return (
        <div className={cx("wrapper")}>
            <Breadcrumb
                className={cx("breadcrumbs")}
                items={breadCrumbList}
                separator=">"
            />

            <h3 className={cx("title")}>{title}</h3>

            <Divider />
        </div>
    );
}
