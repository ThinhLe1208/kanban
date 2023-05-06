import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import classNames from "classnames/bind";

import styles from './ProjectTemplate.module.scss';
import Sidebar from 'components/Sidebar/Sidebar';
import Header from 'components/Header/Header';
import { getAllTaskTypeSagaAction } from 'redux/saga/actions/taskTypeAction';
import { getAllPrioritySagaAction } from 'redux/saga/actions/priorityAction';
import { getAllStatusSagaAction } from 'redux/saga/actions/statusAction';

const cx = classNames.bind(styles);

export default function ProjectTemplate(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        // call api to get all task types
        dispatch(getAllTaskTypeSagaAction());
        // call api to get all priorities
        dispatch(getAllPrioritySagaAction());
        // call api to get all statuses
        dispatch(getAllStatusSagaAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout className={cx("wrapper")}>
            <Sidebar />

            <Layout className={cx("content")}>
                <Header />

                <Outlet />
            </Layout>
        </Layout>
    );
}
