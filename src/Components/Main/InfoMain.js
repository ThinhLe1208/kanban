import React from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

export default function InfoMain() {
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const { projectName = '', members = [], description = '' } = projectDetail;

    const renderAvatarGroup = () => {
        return members?.map((m, i) => (
            <div key={i} className="avatar">
                <img src={m.avatar} alt="avatar" />
            </div>
        ));
    };

    return (
        <>
            <h1 className='fs-1 mt-3 mb-4'>{projectName}</h1>

            <section>
                <h3>Description :</h3>
                <div>{parse(description)}</div>
            </section>

            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatarGroup()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>
    );
}
