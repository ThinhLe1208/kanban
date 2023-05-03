import React from 'react';
import { Outlet } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './ProjectTemplate.module.scss';
import Sidebar from 'components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

export default function ProjectTemplate(props) {

    return (
        <div className={cx("wrapper")}>
            <Sidebar />

            <Outlet />
        </div>
    );
}
