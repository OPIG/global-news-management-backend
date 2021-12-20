import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAllRightsList } from '@/api'
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

// const menuList = [
//   {
//     key: '/',
//     title: '首页',
//     icon: <UserOutlined />
//   },
//   {
//     key: '/user-manage',
//     title: '用户管理',
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: '/user-manage/list',
//         title: '用户列表',
//         icon: <UserOutlined />,
//         children: []
//       }
//     ]
//   },
//   {
//     key: '/right-manage',
//     title: '权限管理',
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: '/right-manage/right/list',
//         title: '权限列表',
//         icon: <UserOutlined />
//       },
//       {
//         key: '/right-manage/role/list',
//         title: '角色列表',
//         icon: <UserOutlined />
//       }
//     ]
//   }
// ]

const iconListMapping = {
  '/': <UserOutlined />,
  '/user-manage': <MenuUnfoldOutlined />
}
export default function SideMenu(props) {
  let navigate = useNavigate()
  const [menuList, setMenuList] = useState([])
  useEffect(() => {
    getAllRightsList().then((res) => {
      setMenuList(res)
    })
  }, [])

  const checkPermission = (item) => !!item.pagepermission

  const renderMenus = (menuList) => {
    return menuList.map((item, index) => {
      if (item?.children?.length && checkPermission(item)) {
        return (
          <SubMenu
            key={item.key}
            title={item.title}
            icon={iconListMapping[item.key]}
          >
            {renderMenus(item.children)}
          </SubMenu>
        )
      } else {
        return (
          checkPermission(item) && (
            <Menu.Item
              key={item.key}
              icon={iconListMapping[item.key]}
              onClick={sideBarNavigate}
            >
              {item.title}
            </Menu.Item>
          )
        )
      }
    })
  }

  const sideBarNavigate = (e) => {
    console.log(props, '===')
    navigate(e.key)
  }

  console.log(props, '-----')
  let location = useLocation()
  const selectKeys = [location.pathname]
  const openKeys = ['/' + location.pathname.split('/')[1]]
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className={Style.logo}>全球新闻发布系统</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={openKeys}>
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
        </div>
      </div>
    </Sider>
  )
}
