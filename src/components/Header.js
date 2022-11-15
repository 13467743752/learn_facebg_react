import React from 'react'
import cookie from "react-cookies";
import { Link } from 'react-router-dom'
import {
  Menu,
  Button
} from "element-react";
import 'element-theme-default';
import PageLogin from '../pages/Login';

// The Header creates links that can be used to navigate
// between routes.
const Header = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();
    cookie.remove('token')
    props.saveToken(null);
  }
  return (
    <header>
      <div>
        {/* onSelect={(e) => { console.info(e);; }} */}
        <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" > 
          <Menu.Item index="1">处理中心</Menu.Item>
          <Menu.SubMenu index="2" title="我的工作台">
            <Menu.Item index="2-1"><Link to='/'>home</Link></Menu.Item>
            <Menu.Item index="2-2"><Link to='/player'>player</Link></Menu.Item>
            <Menu.Item index="2-3"><Link to='/player/2'>playerDetail2</Link></Menu.Item>
            <Menu.Item index="2-3"><Link to='/camera'>camera</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item index="3" title={"欢迎登录:" + props.token}><div onClick={handleLogout}>登出</div></Menu.Item>
        </Menu>
      </div>
    </header>
  )
}

export default Header
