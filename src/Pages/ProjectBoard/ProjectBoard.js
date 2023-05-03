import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShareAltOutlined, SettingOutlined, BellOutlined, SearchOutlined, LayoutOutlined, BarsOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';

import styles from './ProjectBoard.module.scss';
import { getProjectDetailSagaAction } from 'redux/saga/actions/projectAction';
import InfoModal from 'components/Modal/InfoModal';
import Column from 'components/Column/Column';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { Avatar, Button, Input } from 'antd';
import Detail from 'components/Detail/Detail';

const cx = classNames.bind(styles);

export default function ProjectBoard() {
    const dispatch = useDispatch();

    // get porjectId form url
    const { projectId } = useParams();

    const { projectDetail } = useSelector(state => state.projectReducer);
    const { lstTask, projectName } = projectDetail;

    const breadCrumbList = [
        { href: '/', title: 'Home' },
        { href: '/project', title: 'Projects' },
        { title: projectName }
    ];

    console.log('projectDetail', projectDetail);

    const renderColumns = () => {
        return lstTask?.map((task, index) => (
            <div key={index} className={cx("col")}>
                <Column task={task} />
            </div>
        ));
    };

    useEffect(() => {
        // call api and save projectDetail data to redux store by using projectId dinamic param
        dispatch(getProjectDetailSagaAction(projectId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx("wrapper")}>
            <Breadcrumbs items={breadCrumbList} />

            <div className={cx("header")}>
                <div className={cx("headerLeft")}>
                    <LayoutOutlined className={cx("icon")} />
                    <h3 className={cx("projectName")}>{projectName}</h3>
                </div>

                <div className={cx("headerRight")}>
                    <Input
                        className={cx("search")}
                        placeholder="Search..."
                        suffix={<SearchOutlined />}
                    />
                    <SettingOutlined className={cx("icon")} />
                    <BellOutlined className={cx("icon")} />
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                </div>
            </div>

            <div className={cx("detail")}>
                <Detail />
            </div>

            <div className={cx("filter")}>
                <div className={cx("filterLeft")}>
                    <Button>Only my issues</Button>
                    <Button>Recently updated</Button>
                </div>
                <div className={cx("filterRight")}>
                    <button className={cx("filterItem", "boardBtn")}>
                        <LayoutOutlined style={{ color: 'var(--bg-blue-3)' }} />
                    </button>
                    <button className={cx("filterItem")} >
                        <BarsOutlined />
                    </button>
                    <button className={cx("filterItem", "shareBtn")}>
                        <ShareAltOutlined style={{ color: 'var(--white)', marginRight: '6px' }} />
                        Share
                    </button>
                </div>
            </div>

            <div className={cx("row")} >
                {renderColumns()}
            </div>


            <InfoModal />
        </div>
    );
}
