import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, UserOutlined } from '@ant-design/icons'
import Style from './topHeader.module.scss'

const { Header } = Layout

const menu = (
  <Menu>
    <Menu.Item>
      超级管理员
    </Menu.Item>
    <Menu.Item danger>logout</Menu.Item>
  </Menu>
);


export default function TopHeader() {
  const [isCollpased, setIsCollpased] = useState(false)
  const changeCollpased = () => {
    setIsCollpased(!isCollpased)
  }

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {isCollpased ? (
        <MenuUnfoldOutlined onClick={changeCollpased} />
      ) : (
        <MenuFoldOutlined onClick={changeCollpased} />
      )}
      {/* {React.createElement(isCollpased ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
    })} */}
      <div className={Style.topInfo}>
        <span>
          欢迎<b>管理员</b>回来
        </span>
        <Dropdown overlay={menu}>
          <button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <DownOutlined />
          </button>
        </Dropdown>
      </div>
    </Header>
  )
}
