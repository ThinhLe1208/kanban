import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
    let { name, email, avatar } = useSelector(state => state.UserReducer.currentUser);

    return (
        <>
            {name && (
                <div>
                    <img src={avatar} alt="avatar" width={100} />
                    <p>Name : {name}</p>
                    <p>Email : {email}</p>
                </div>
            )}
        </>
    );
}
