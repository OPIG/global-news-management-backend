import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Switch, Modal } from 'antd'
import { getUserLists, getRegionList, getRolesList } from '@/api'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import UserForm from '@/components/user-manage/UserForm'

export default function UserList() {
  const [dataSource, setdataSource] = useState([])
  const [visible, setvisible] = useState(false)
  const [form, setform] = useState({})
  const [regionList, setRegionList] = useState([])
  const [rolesList, setRoleList] = useState([])
  const addFormRef = useRef()

  useEffect(() => {
    getUserLists().then((res) => {
      setdataSource(res)
    })
  }, [])

  useEffect(() => {
    getRegionList().then((res) => {
      setRegionList(res)
    })
  }, [])

  useEffect(() => {
    getRolesList().then((res) => {
      setRoleList(res)
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

  const handelSwitch = (item) => {}
  const popupDelete = (id) => {}
  const popupEdit = (id) => {}
  const onChange = () => {}

  // 显示添加用户弹窗
  const addUser = () => {
    setvisible(true)
  }
  // 隐藏添加用户弹窗
  const onCancel = () => {
    setvisible(false)
  }
  const onCreate = () => {}
  return (
    <div>
      <Button type="primary" onClick={() => addUser()}>
        添加用户
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item.id}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        visible={visible}
        title="添加用户"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          addFormRef.current.validateFields().then(value => {
            // TODO
            console.log(value, '----')
          }).catch(err => {
            console.log(err, '===')
          })
        }}
      >
       <UserForm rolesList={rolesList} regionList={regionList} ref={addFormRef}></UserForm>
      </Modal>
    </div>
  )
}
