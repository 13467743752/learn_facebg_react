import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import cookie from "react-cookies";
import {
    Message
} from "element-react";
import PageLogin from '../pages/Login';

export default function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) => {
            const sid = cookie.load('token')
            if (!sid) {
                Message({
                    message: '请先登录',
                    type: 'warning'
                });
                return (
                    <PageLogin/>
                )
            } else {
                return <Component {...props} />
            }
        }}></Route>
    )
}