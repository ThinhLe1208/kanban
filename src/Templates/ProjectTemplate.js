import React from 'react';
import Sidebar from '../Components/Sidebar';
import Menu from '../Components/Menu';
import { Outlet } from 'react-router-dom';

export default function ProjectTemplate() {
    return (
        <div className="jira">
            <Sidebar />
            <Menu />

            <Outlet />
        </div>
    );
}
