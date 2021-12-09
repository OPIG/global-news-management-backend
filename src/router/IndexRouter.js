import React from 'react'
import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from '../views/login/Login'
import Test from '../views/login/Test'
import NewsSandBox from '../views/sandBox/NewsSandBox'

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={localStorage.getItem("token") ? <Test/>:<Login/>}></Route>
        {/* 写法一 /* */}
        <Route path="/*" element={localStorage.getItem("token") ? <NewsSandBox/>:<Navigate to="/login"/>}></Route>
        {/* 写法二 Route嵌套配合Outlet实现嵌套 */}
        {/* <Route path="/" element={<NewsSandBox/>}>
          <Route index element={<Home/>}></Route>
          <Route path="user-manage/list" element={<UserList/>}></Route>
          <Route path="right-manage/role/list" element={<RoleList/>}></Route>
          <Route path="right-manage/right/list" element={<RightList/>}></Route>
          <Route path="*" element={<NoPermission/>}></Route>
        </Route> */}
        <Route path="*" element={<span>there is no permission</span>}></Route>
      </Routes>
      </HashRouter>
  )
}
