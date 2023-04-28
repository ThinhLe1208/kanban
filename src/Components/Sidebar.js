import React, { useState } from 'react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Sider } = Layout;

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout>
            <Sider
                onMouseEnter={() => setCollapsed(false)}
                onMouseLeave={() => setCollapsed(true)}
                trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    items={[
                        {
                            key: '1',
                            icon: <SearchOutlined />,
                            label: 'SEARCH ISSUES',
                        },
                        {
                            key: '2',
                            icon: <PlusOutlined />,
                            label: 'CREATE ISSUE',
                        }
                    ]}
                />
            </Sider>
        </Layout>
    );
}
