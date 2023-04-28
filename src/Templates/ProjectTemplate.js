import React from 'react';
import { Outlet } from 'react-router-dom';

import Menu from 'Components/Menu';
import Sidebar from 'Components/Sidebar';

export default function ProjectTemplate() {
    return (
        <div className="jira">
            <Sidebar />
            <Menu />

            <Outlet />
        </div>
    );
}
