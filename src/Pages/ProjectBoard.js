import React from 'react';
import ContentMain from 'components/Main/ContentMain';
import InfoMain from 'components/Main/InfoMain';
import InfoModal from 'components/Modal/InfoModal';
import { Breadcrumb } from 'antd';
import { useEffect } from 'react';
import { getProjectDetailSagaAction } from 'redux/saga/actions/projectAction';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();
    const { projectId } = useParams();

    useEffect(() => {
        // call api and save projectDetail data to redux store by using projectId dinamic param
        dispatch(getProjectDetailSagaAction(projectId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="main container py-3">
                <Breadcrumb
                    items={breadCrumbList}
                />

                <InfoMain />
                <ContentMain />
            </div>

            <InfoModal />
        </>
    );
}
