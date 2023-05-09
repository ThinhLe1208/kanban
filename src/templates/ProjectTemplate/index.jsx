import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import { getAllTaskTypeSagaAction } from "redux/saga/actions/taskTypeAction";
import { getAllPrioritySagaAction } from "redux/saga/actions/priorityAction";
import { getAllStatusSagaAction } from "redux/saga/actions/statusAction";
import { getProjectCategorySagaAction } from "redux/saga/actions/projectCategoryAction";

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
    // call api to get projectCategory
    dispatch(getProjectCategorySagaAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className={cx("wrapper")}>
      <Sidebar />

      <Layout className={cx("content")}>
        <Header />
        <div className={cx("outlet")}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
}
