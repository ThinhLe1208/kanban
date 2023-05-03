import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './Column.module.scss';
import Issue from 'components/Issue/Issue';

const cx = classNames.bind(styles);

export default function Column({ task }) {
    const { statusName } = task;

    const renderIssues = () => task.lstTaskDeTail?.map((issue, index) => <Issue key={index} issue={issue} />);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <span className={cx("name")}>{statusName}</span>
                <span className={cx("qty")}>{task.lstTaskDeTail?.length}</span>
            </div>

            <div className={cx("issues")}>
                {renderIssues()}
            </div>

            <button className={cx("addIssueBtn")}>
                <PlusCircleOutlined style={{ marginRight: '6px' }} />
                Add another issue
            </button>
        </div>
    );
}
