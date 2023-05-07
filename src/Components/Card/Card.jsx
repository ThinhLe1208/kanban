import React from "react";
import classNames from "classnames/bind";

import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

export default function Card({ children, className, ...rest }) {
  return (
    <div className={cx("wrapper", className)} {...rest}>
      {children}
    </div>
  );
}
