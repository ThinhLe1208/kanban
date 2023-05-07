import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Dropdown, Space } from "antd";
import { faEllipsis, faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faHardDrive, faPenToSquare, faStar, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
import Issue from "components/Issue";
import CreateTaskForm from "components/CreateTaskForm";
import { useDispatch } from "react-redux";
import { setOffcanvas } from "redux/reducers/offcanvasReducer";

const cx = classNames.bind(styles);

export default function Column({ colDetail, index }) {
  const { statusId, statusName, lstTaskDeTail } = colDetail;
  const dispatch = useDispatch();
  const renderIssues = () => lstTaskDeTail?.map((issue, index) => <Issue key={index} issue={issue} index={index} />);

  const handleClickAddIssueBtn = () => {
    dispatch(
      setOffcanvas({
        title: "Create Issue",
        icon: <FontAwesomeIcon icon={faFileCirclePlus} />,
        aceptBtn: "Create",
        showBtn: true,
        offcanvasContent: <CreateTaskForm />,
      })
    );
  };

  const headerStyle = () => {
    switch (index) {
      case 0:
        return "var(--error)";
      case 1:
        return "var(--success)";
      case 2:
        return "var(--warning)";
      default:
        return "var(--info)";
    }
  };

  const items = [
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>Rename list</span>
        </Space>
      ),
      key: "0",
    },
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faStar} />
          <span>Add to favorites</span>
        </Space>
      ),
      key: "1",
    },
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faHardDrive} />
          <span>Archive list</span>
        </Space>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Space style={{ color: "#e46a76" }}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>Remove</span>
        </Space>
      ),
      key: "4",
    },
  ];

  return (
    <Droppable
      // props of beautiful-dnd
      droppableId={statusId.toString()}
      key={statusId}
      index={index}
      className="bg-primary p-2"
      style={{ minHeight: "500px" }}
    >
      {(provided) => {
        return (
          <div className={cx("wrapper")}>
            <div className={cx("header")} style={{ backgroundColor: headerStyle() }}>
              <div className={cx(`leftSide`)}>
                <span className={cx("name")}>{statusName}</span>
                <Badge count={lstTaskDeTail?.length} style={{ backgroundColor: headerStyle() }} />
              </div>

              <div className={cx(`rightSide`)}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  placement="bottomLeft"
                >
                  <Button type="text" icon={<FontAwesomeIcon icon={faEllipsis} style={{ color: "white" }} />} />
                </Dropdown>
              </div>
            </div>

            <ul
              className={cx("issues")}
              // props of beautiful-dnd
              key={statusId}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {renderIssues()}
              {provided.placeholder}
            </ul>

            <button className={cx("addIssueBtn")} onClick={handleClickAddIssueBtn}>
              <PlusCircleOutlined style={{ marginRight: "6px" }} />
              Add another issue
            </button>
          </div>
        );
      }}
    </Droppable>
  );
}
