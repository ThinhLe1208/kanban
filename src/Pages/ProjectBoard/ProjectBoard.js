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
import { Avatar, Button, Col, Input, Row } from 'antd';
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
            <Col key={index} >
                <Column task={task} />
            </Col>
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

            <Row className={cx("header")} >
                <Col className={cx("headerLeft")} xs={24} md={12} >
                    <LayoutOutlined className={cx("icon")} />
                    <h3 className={cx("projectName")}>{projectName}</h3>
                </Col>

                <Col className={cx("headerRight")} xs={24} md={12}>
                    <Input
                        className={cx("search")}
                        placeholder="Search..."
                        suffix={<SearchOutlined />}
                    />
                    <SettingOutlined className={cx("icon")} />
                    <BellOutlined className={cx("icon")} />
                    <Avatar className={cx("avatar")} src="https://api.multiavatar.com/Binx.png" />
                </Col>
            </Row>

            <div className={cx("detail")}>
                <Detail />
            </div>

            <Row className={cx("filter")} >
                <Col className={cx("filterLeft")} >
                    <Button className={cx("filterItem")}>Only my issues</Button>
                    <Button className={cx("filterItem")}>Recently updated</Button>
                </Col>

                <Col className={cx("filterRight")} >
                    <button className={cx("filterItem", "boardBtn")}>
                        <LayoutOutlined style={{ color: 'var(--bg-blue-3)' }} />
                    </button>
                    <button className={cx("filterItem")}>
                        <BarsOutlined />
                    </button>
                    <button className={cx("filterItem", "shareBtn")}>
                        <ShareAltOutlined style={{ color: 'var(--white)', marginRight: '6px' }} />
                        Share
                    </button>
                </Col>
            </Row>

            <Row className={cx("columns")} wrap={false}>
                {renderColumns()}
            </Row>


            <InfoModal />
        </div>
    );
}
