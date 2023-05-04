import React, { useState } from 'react';
import { SettingOutlined, UserOutlined, PlusOutlined, SearchOutlined, LayoutOutlined, FileAddOutlined, ClusterOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './Sidebar.module.scss';
import { setDrawer } from 'redux/reducers/drawerReducer';
import CreateTaskForm from 'components/Form/CreateTaskForm/CreateTaskForm';

const cx = classNames.bind(styles);

export default function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);

    function getItem(label, key, icon, children) {
        return {
            label,
            key,
            icon,
            children
        };
    }

    const itemsTop = [
        getItem('Project board', 'projectBoard', <LayoutOutlined className={cx("icon")} />),
        getItem('Create project', 'createProject', <FileAddOutlined className={cx("icon")} />),
        getItem('Project Management', 'projectManagement', <ClusterOutlined className={cx("icon")} />),
        getItem('Search issue', 'searchIssue', <SearchOutlined className={cx("icon")} />),
        getItem('Create issue', 'createIssue', <PlusOutlined className={cx("icon")} />),
    ];

    const itemsBottom = [
        getItem('Options', 'options', <SettingOutlined className={cx("icon")} />),
        getItem('User', 'user', <UserOutlined className={cx("icon")} />),
    ];

    const handleClickMenuItem = ({ event, key, keyPath }) => {
        switch (key) {
            case 'projectBoard': {
                navigate('board');
                break;
            }
            case 'createProject': {
                navigate('create');
                break;
            }
            case 'projectManagement': {
                navigate('management');
                break;
            }
            case 'createIssue': {
                dispatch(setDrawer({ title: 'Create Task', drawerContent: <CreateTaskForm /> }));
                break;
            }
            default: {
                console.warn('Default handleClickMenuItem');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Layout.Sider
                className={cx("sidebar")}
                onMouseEnter={() => setCollapsed(false)}
                onMouseLeave={() => setCollapsed(true)}
                collapsedWidth={80}
                width={210}
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme='dark'
            >
                <img className={cx("logo")} src={require('../../assets/img/logo_jira.png')} alt="logo_jira" />

                <div className={cx("menu")}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={itemsTop}
                        onClick={handleClickMenuItem}
                    />

                    <Menu
                        theme="dark"
                        mode="inline"
                        items={itemsBottom}
                        onClick={handleClickMenuItem}
                    />
                </div>
            </Layout.Sider>
        </div>
    );
}
