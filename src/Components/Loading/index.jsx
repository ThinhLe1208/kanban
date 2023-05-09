import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export default function Loading() {
  const { isLoading } = useSelector((state) => state.uiControlReducer);

  if (isLoading) {
    return (
      <div className={cx("bgLoading")}>
        <img src={require("../../assets/images/loading.png")} alt="loading" />
      </div>
    );
  }
}
