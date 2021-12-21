import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, message, Tree } from 'antd'
import {
  getRolesList,
  deleteRolesById,
  getAllRightsList,
  patchRolesRightsById
} from '@/api'
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EditOutlined
} from '@ant-design/icons'
const { confirm } = Modal

export default function RoleList() {
  const [rolesList, setrolesList] = useState([])
  const [rightsList, setRightsList] = useState([])
  const [currentRights, setCurrentRights] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  useEffect(() => {
    getRolesList().then((res) => {
      setrolesList(res)
    })
  }, [])

  useEffect(() => {
    getAllRightsList().then((res) => {
      setRightsList(res)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
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
              onClick={() => popupDelete(item)}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => popupEdit(item)}
            ></Button>
          </>
        )
      }
    }
  ]

  const popupDelete = (item) => {
    confirm({
      title: '你确认要删除吗',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteConfirm(item)
      }
    })
  }

  const popupEdit = (item) => {
    setIsModalVisible(true)
    setCurrentRights(item.rights)
    setCurrentId(item.id)
  }

  const deleteConfirm = (item) => {
    console.log('delete:', item)
    setrolesList(rolesList.filter((data) => data.id !== item.id))
    deleteRolesById(item.id).then((res) => {
      message.info(`delete ${item.name} successfuly!`)
    })
  }

  const handleOk = () => {
    setIsModalVisible(false)
    setrolesList(
      rolesList.map((item) => {
        if (item.id === currentId) {
          return {
            ...item,
            rights: currentRights
          }
        }
        return item
      })
    )
    const payload = { id: currentId, rights: currentRights }
    patchRolesRightsById(payload).then((res) => {})
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onCheck = (checkList) => {
    setCurrentRights(checkList.checked)
  }
  return (
    <div>
      <Table
        columns={columns}
        dataSource={rolesList}
        rowKey={(item) => item.id}
      />
      <Modal
        title="权限分配"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly
          treeData={rightsList}
        />
      </Modal>
    </div>
  )
}
