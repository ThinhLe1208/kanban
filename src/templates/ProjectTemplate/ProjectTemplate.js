import React from 'react';
import { Outlet } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './ProjectTemplate.module.scss';
import Sidebar from 'components/Sidebar/Sidebar';
import { Layout } from 'antd';

const cx = classNames.bind(styles);

export default function ProjectTemplate(props) {

    return (
        <Layout className={cx("wrapper")}>
            <Sidebar />

            <Layout className={cx("content")}>
                <Outlet />
            </Layout>
        </Layout>
    );
}
