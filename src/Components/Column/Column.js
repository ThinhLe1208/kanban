import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames/bind';

import styles from './Column.module.scss';
import Issue from 'components/Issue/Issue';

const cx = classNames.bind(styles);

export default function Column({ colDetail, index }) {
    const { statusId, statusName, lstTaskDeTail } = colDetail;
    const renderIssues = () => lstTaskDeTail?.map((issue, index) => <Issue key={index} issue={issue} index={index} />);

    return (
        <Droppable
            // props of beautiful-dnd
            droppableId={statusId.toString()}
            key={statusId}
            index={index}

            className="bg-primary p-2"
            style={{ minHeight: '500px' }
            }
        >
            {(provided) => {
                return (
                    <div className={cx("wrapper")}>
                        <div className={cx("header")}>
                            <span className={cx("name")}>{statusName}</span>
                            <span className={cx("qty")}>{lstTaskDeTail?.length}</span>
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

                        <button className={cx("addIssueBtn")}>
                            <PlusCircleOutlined style={{ marginRight: '6px' }} />
                            Add another issue
                        </button>
                    </div>
                );
            }}
        </Droppable >
    );
}
