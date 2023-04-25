import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <NavLink to='/signin'>Sign in</NavLink>
            <NavLink to='/project'>Project</NavLink>
        </>
    );
}
