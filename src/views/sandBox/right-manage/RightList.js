import React, { useState, useEffect } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd'
import {
  getAllRightsList,
  deleteRightsById,
  deleteChildrenRightsById,
  updatePermission
} from '@/api'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
const { confirm } = Modal

export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  const [currDataSouce, setcurrDataSouce] = useState(null)
  useEffect(() => {
    getAllRightsList().then((res) => {
      const list = JSON.parse(JSON.stringify(res))
      list.forEach((item) => {
        if (!item?.children?.length) {
          item.children = ''
        }
      })
      setcurrDataSouce(list)
      setdataSource(res)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => popupDelete(item)}
            />

            <Popover
              content={
                <Switch
                  checkedChildren="开启"
                  unCheckedChildren="关闭"
                  checked={item.pagepermission}
                  onChange={() => handelSwitch(item)}
                />
              }
              title="配置项"
              trigger={item.pagepermission === undefined ? '' : 'click'}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermission === undefined}
              />
            </Popover>
          </div>
        )
      }
    }
  ]

  const deleteConfirm = (item) => {
    if (item.grade === 1) {
      setcurrDataSouce(currDataSouce?.filter((data) => data.id !== item.id))
      deleteRightsById(item.id)
    } else {
      const list = JSON.parse(JSON.stringify(currDataSouce))
      let childrenList = list.find((data) => data.id === item.rightId)
      childrenList.children = childrenList?.children.filter(
        (data) => data.id !== item.id
      )
      console.log(list, childrenList)
      setcurrDataSouce(list)
      deleteChildrenRightsById(item.id)
    }
  }

  const deleteCancel = () => {}

  const popupDelete = (item) => {
    confirm({
      title: '你确认要删除吗',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteConfirm(item)
      },
      onCancel() {
        deleteCancel()
      }
    })
  }

  const handelSwitch = (item) => {
    item.pagepermission = item.pagepermission === 1 ? 0 : 1
    console.log(item)
    setcurrDataSouce([...currDataSouce])
    updatePermission({
      type: item.grade === 1 ? 'rights' : 'children',
      id: item.id,
      pagepermission: item.pagepermission
    })
  }
  return (
    <div>
      <Table
        dataSource={currDataSouce}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  )
}
