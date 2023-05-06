import NavHome from 'components/NavHome';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function HomeTemplate() {
    return (
        <>
            <NavHome />
            <Outlet />
        </>
    );
}
