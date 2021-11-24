import React from 'react'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import Style from './topHeader.module.scss'

const { Header } = Layout;
export default function TopHeader() {
  console.log(Style, '===')
  return (
    <Header className="site-layout-background" style={{padding: "0 16px"}}>
    {React.createElement(true ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
    })}
  </Header>
  )
}
