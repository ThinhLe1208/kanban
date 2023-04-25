import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Menu() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../assets/img/logo.jfif")} alt="logo" />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <ul className="control">
                <li>
                    <NavLink to='board' className={({ isActive }) => isActive ? 'text-primary' : 'text-dark'}>
                        <i className="fa fa-credit-card" />
                        <span>Cyber Board</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='create' className={({ isActive }) => isActive ? 'text-primary' : 'text-dark'}>
                        <i className="fa fa-cog" />
                        <span>Create Project</span>
                    </NavLink>
                </li>
            </ul>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>
    );
}
