import React from 'react';
import classNames from 'classnames/bind';
import { Avatar, Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import styles from './Detail.module.scss';

const cx = classNames.bind(styles);

export default function Detail() {
    const { projectDetail } = useSelector(state => state.projectReducer);
    const { members } = projectDetail;

    const renderAvatars = () => members?.map((member, index) => (
        <Tooltip key={index} title={member.name} placement="top">
            <Avatar className={cx("avatar")} src={member.avatar} />
        </Tooltip>
    ));

    return (
        <div className={cx("wrapper")}>
            <div className={cx("item")}>
                <span className={cx("subDetail")}>Create on:</span>
                <span className={cx("detail")}>May 14,2022</span>
            </div>

            <div className={cx("item")}>
                <span className={cx("subDetail")}>Location:</span>
                <span className={cx("detail")}>Viet Nam</span>
            </div>

            <div className={cx("item")}>
                <span className={cx("subDetail")}>Team:</span>
                <Avatar.Group className={cx("avatarGroup")}>
                    {renderAvatars()}
                </Avatar.Group>
            </div>


        </div>
    );
}
