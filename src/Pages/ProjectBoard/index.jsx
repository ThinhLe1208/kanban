import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Segmented } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { getProjectDetailSagaAction } from 'redux/saga/actions/projectAction';
import Detail from 'components/Detail';
import Kanban from 'components/Kanban';
import Heading from 'components/Heading';

const cx = classNames.bind(styles);

export default function ProjectBoard() {
    const dispatch = useDispatch();
    // get porjectId form url
    const { projectId } = useParams();
    const { projectDetail } = useSelector(state => state.projectReducer);
    const { projectName } = projectDetail;

    const breadCrumbList = [
        { href: '/', title: 'Home' },
        { href: '/project', title: 'Project' },
        { title: projectName }
    ];

    console.log('projectDetail', projectDetail);

    useEffect(() => {
        // call api and save projectDetail data to redux store by using projectId dinamic param
        dispatch(getProjectDetailSagaAction(projectId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx(`heading`)}>
                <Heading breadCrumbList={breadCrumbList} title={projectName} />
            </div>

            <div className={cx("detail")}>
                <Detail />
            </div>

            <Row className={cx("filter")} >
                <Col className={cx("filterLeft")} >
                    <Input className={cx(`search`)} placeholder="Search..." prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} />
                    <Button >Only my issues</Button>
                    <Button >Recently updated</Button>
                </Col>

                <Col className={cx("filterRight")} >
                    <Segmented
                        options={[
                            {
                                label: 'Kanban',
                                value: 'Kanban',
                                icon: <AppstoreOutlined />,
                            },
                            {
                                label: 'List',
                                value: 'List',
                                icon: <BarsOutlined />,
                            },
                        ]}
                    />
                </Col>
            </Row>

            <div className={cx("board")}>
                <Kanban projectDetail={projectDetail} />
            </div>

        </div>
    );
}
