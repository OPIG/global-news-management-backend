import React, { useEffect, useState } from 'react'
import { Table, Button, Switch } from 'antd'
import { getUserLists } from '@/api'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default function UserList() {
  const [dataSource, setdataSource] = useState([])

  useEffect(() => {
    getUserLists().then((res) => {
      setdataSource(res)
    })
  }, [])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      key: 'roleId',
      render: (role) => {
        return role.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      key: 'roleState',
      render: (roleState, item) => {
        return (
          <Switch
            checked={roleState}
            disabled={item.default}
            onChange={() => handelSwitch(item)}
          ></Switch>
        )
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              disabled={item.default}
              onClick={() => popupDelete(item)}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
              onClick={() => popupEdit(item)}
            ></Button>
          </>
        )
      }
    }
  ]

  const handelSwitch = (item) => {

  }
  const popupDelete = (id) => {}
  const popupEdit = (id) => {}
  const onChange = () => {}
  return (
    <div>
      <Button type="primary">添加用户</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}
