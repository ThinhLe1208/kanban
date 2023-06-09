import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export default function Title({ children, icon, ...rest }) {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("icon")}>{icon}</span>
      <span className={cx("text")} {...rest}>
        {children}
      </span>
    </div>
  );
}
