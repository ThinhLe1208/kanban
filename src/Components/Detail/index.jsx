import React from "react";
import { Avatar, Col, Row, Tooltip } from "antd";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export default function Detail() {
  const { projectDetail } = useSelector((state) => state.projectReducer);
  const { members } = projectDetail;

  const renderAvatars = () =>
    members?.map((member, index) => (
      <Tooltip key={index} title={member.name} placement="top">
        <Avatar className={cx("avatar")} src={member.avatar} />
      </Tooltip>
    ));

  return (
    <Row className={cx("wrapper")}>
      <Col className={cx("item")}>
        <span className={cx("subDetail")}>Create on:</span>
        <span className={cx("detail")}>May 14,2022</span>
      </Col>

      <Col className={cx("item")}>
        <span className={cx("subDetail")}>Location:</span>
        <span className={cx("detail")}>Viet Nam</span>
      </Col>

      <Col className={cx("item")}>
        <span className={cx("subDetail")}>Team:</span>
        <Avatar.Group className={cx("avatarGroup")}>{renderAvatars()}</Avatar.Group>
      </Col>
    </Row>
  );
}
