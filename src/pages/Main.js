import React, { useState, useEffect } from 'react';
import cookie from "react-cookies";
import PageLogin from './Login';
import Main from '../components/Main'
import Header from '../components/Header'

export default function AppLayout() {
    const [token, setToken] = useState();
    useEffect(() => {
        let value = cookie.load('token');
        setToken(value)
    })
    const saveToken = (token) => {
        let cookieTime = new Date(new Date().getTime + 24 * 3600 * 1000);
        if (token) {
            cookie.save('token', token, {
                expires: cookieTime,
                // sameSite:'none'
            })
            setToken(token)
        }else{
            setToken(null)
        }
    }
    if (!token) {
        return <PageLogin saveToken={saveToken}/>;
    }
    return (
        <div>
            <Header token={token} saveToken={saveToken}>
            </Header>
            <Main>
            </Main>
        </div>
    );
}