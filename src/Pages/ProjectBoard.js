import React from 'react';
import ContentMain from 'Components/Main/ContentMain';
import InfoMain from 'Components/Main/InfoMain';
import InfoModal from 'Components/Modal/InfoModal';
import { Breadcrumb } from 'antd';

const breadCrumbList = [
    {
        href: '/',
        title: 'Home',
    },
    {
        href: '/project',
        title: 'Project',
    },
    {
        title: 'Project Board',
    }
];

export default function ProjectBoard() {
    return (
        <>
            <div className="main container py-3">
                <Breadcrumb
                    items={breadCrumbList}
                />

                <h1 className='fs-1 mt-3 mb-4'>Project Board</h1>

                <InfoMain />
                <ContentMain />
            </div>

            <InfoModal />
        </>
    );
}
