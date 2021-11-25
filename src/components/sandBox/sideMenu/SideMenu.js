import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons'
import Style from './sideMenu.module.scss'
const { Sider } = Layout
const { SubMenu } = Menu

const menuList = [
  {
    key: '/',
    title: '首页',
    icon: <UserOutlined />
  },
  {
    key: '/user-manage',
    title: '用户管理',
    icon: <UserOutlined />,
    children: [
      {
        key: '/user-manage/list',
        title: '用户列表',
        icon: <UserOutlined />,
        children: []
      }
    ]
  },
  {
    key: '/right-manage',
    title: '权限管理',
    icon: <UserOutlined />,
    children: [
      {
        key: '/right-manage/right/list',
        title: '权限列表',
        icon: <UserOutlined />
      },
      {
        key: '/right-manage/role/list',
        title: '角色列表',
        icon: <UserOutlined />
      }
    ]
  }
]

export default function SideMenu(props) {
  let navigate = useNavigate()
  const renderMenus = (menuList) => {
    return menuList.map((item, index) => {
      if (item.children && item.children.length) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {renderMenus(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key} icon={item.icon} onClick={sideBarNavigate}>
            {item.title}
          </Menu.Item>
        )
      }
    })
  }

  const sideBarNavigate = (e) => {
    console.log(props, '===')
    navigate(e.key)
  }
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className={Style.logo}>全球新闻发布系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {/* <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <SubMenu key="3" icon={<MenuUnfoldOutlined/>} title="用户管理">
          <Menu.Item key="4" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </SubMenu> */}

        {renderMenus(menuList)}
      </Menu>
    </Sider>
  )
}
