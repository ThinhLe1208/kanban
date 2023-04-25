import React from 'react';
import HeaderMain from '../Components/Main/HeaderMain';
import InfoMain from '../Components/Main/InfoMain';
import ContentMain from '../Components/Main/ContentMain';
import InfoModal from '../Components/Modal/InfoModal';

export default function ProjectBoard() {
    return (
        <>
            <div className="main">
                <HeaderMain />
                <InfoMain />
                <ContentMain />
            </div>

            <InfoModal />
        </>
    );
}
