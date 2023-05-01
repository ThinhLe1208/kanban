import React from 'react';
import { Outlet } from 'react-router-dom';

import Menu from 'components/Menu';
import Sidebar from 'components/Sidebar';

export default function ProjectTemplate(props) {

    return (
        <div className="jira">
            <Sidebar />
            <Menu />

            <Outlet />
        </div>
    );
}
