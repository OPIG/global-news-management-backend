import React from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import Home from './home/Home'
import NoPermission from './noPermission/NoPermission'
import TopHeader from '../../components/sandBox/topHeader/TopHeader'
import SideMenu from '../../components/sandBox/sideMenu/SideMenu'

const { Content } = Layout;

export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
          {/* 写法一 */}
          <Routes>
            {/* 注意：默认项添加index属性且没有path属性 */}
            <Route index path="home" element={<Home />}></Route>
            <Route path="user-manage/list" element={<UserList />}></Route>
            <Route path="right-manage/role/list" element={<RoleList />}></Route>
            <Route
              path="right-manage/right/list"
              element={<RightList />}
            ></Route>
            <Route path="/" element={<Navigate replace from="/" to="home"/>} />
            <Route path="*" element={<NoPermission />}></Route>
          </Routes>
          {/* 写法二 Outlet */}
          {/* <Outlet/> */}
        </Content>
      </Layout>
    </Layout>
  )
}
