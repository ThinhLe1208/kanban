import React, { useState } from 'react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import CreateTaskForm from './Form/CreateTaskForm/CreateTaskForm';
import { setDrawer } from 'redux/reducers/DrawerReducer';

const { Sider } = Layout;

export default function Sidebar() {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(true);

    function getItem(label, key, icon, children) {
        return {
            label,
            key,
            icon,
            children
        };
    }

    const items = [
        getItem('SEARCH ISSUES', 'search', <SearchOutlined />),
        getItem('CREATE ISSUE', 'create', <PlusOutlined />),
    ];

    const handleClickMenuItem = (data) => {
        switch (data.key) {
            case 'create': {
                dispatch(setDrawer({ title: 'Create Task', drawerContent: <CreateTaskForm /> }));
                break;
            }
            default: {
                console.warning('Default handleClickMenuItem');
            }
        }
    };

    return (
        <div className='sidebar'>
            <Layout >
                <Sider
                    onMouseEnter={() => setCollapsed(false)}
                    onMouseLeave={() => setCollapsed(true)}
                    trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={items}
                        onClick={handleClickMenuItem}
                    />
                </Sider>
            </Layout>
        </div>
    );
}
