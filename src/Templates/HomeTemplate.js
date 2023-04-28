import Header from 'Components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function HomeTemplate() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
