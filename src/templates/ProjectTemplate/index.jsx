import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { getAllTaskTypeSagaAction } from 'redux/sagas/actions/taskTypeAction';
import { getAllPrioritySagaAction } from 'redux/sagas/actions/priorityAction';
import { getAllStatusSagaAction } from 'redux/sagas/actions/statusAction';
import { getProjectCategorySagaAction } from 'redux/sagas/actions/projectCategoryAction';
import { ACCESS_TOKEN, CURRENT_USER } from 'util/constants/settingSystem';
import { showNotification } from 'util/notification';

const cx = classNames.bind(styles);

export default function ProjectTemplate() {
  const dispatch = useDispatch();

  useEffect(() => {
    // call api to get all task types
    dispatch(getAllTaskTypeSagaAction());
    // call api to get all priorities
    dispatch(getAllPrioritySagaAction());
    // call api to get all statuses
    dispatch(getAllStatusSagaAction());
    // call api to get projectCategory
    dispatch(getProjectCategorySagaAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check user signin or not
  if (!localStorage.getItem(ACCESS_TOKEN) || !localStorage.getItem(CURRENT_USER)) {
    showNotification('error', 'You may need to sign in !');
    return <Navigate to='/error' replace={true} />;
  }

  return (
    <Layout className={cx('wrapper')}>
      <Sidebar />

      <Layout className={cx('content')}>
        <Header />
        <div className={cx('outlet')}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
}
