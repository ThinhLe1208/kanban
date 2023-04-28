import React from 'react';
import style from './LoadingComponent.module.css';
import { useSelector } from 'react-redux';

export default function LoadingComponent() {
    const { isLoading } = useSelector(state => state.LoadingReducer);

    if (isLoading) {
        return (
            <div className={style.bgLoading}>
                <img src={require('../../../assets/img/loading.png')} alt="loading" />
            </div>
        );
    }
}
