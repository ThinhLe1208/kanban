import React from 'react';
import style from './Loading.module.css';
import { useSelector } from 'react-redux';

export default function Loading() {
    const { isLoading } = useSelector(state => state.loadingReducer);

    if (isLoading) {
        return (
            <div className={style.bgLoading}>
                <img src={require('../../assets/img/loading.png')} alt="loading" />
            </div>
        );
    }
}
