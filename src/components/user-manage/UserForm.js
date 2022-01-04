import React, { forwardRef, useState } from 'react'
import {Form, Input, Select} from 'antd'

const {Option} = Select

const UserForm = forwardRef((props, ref) => {
  const {rolesList, regionList} = props
  const [isDisabled, setIsDisabled] = useState(false)

  const changeRole = (value) => {
    value === 1?setIsDisabled(true):setIsDisabled(false)
  }
  return (
    <Form
          layout="vertical"
          name="form_in_modal"
          ref={ref}
        >
          <Form.Item
            name="userName"
            label="用户名"
            rules={[
              {
                required: true,
                message: 'Please input the username!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: 'Please input the password!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          {!isDisabled && <Form.Item name="region" label="区域" rules={[{required: true, message: 'Please select region'}]}>
            <Select>
              {regionList.map((item) => {
               return <Option key={item.id} value={item.value}>
                  {item.title}
                </Option>
              })}
            </Select>
          </Form.Item>}
          <Form.Item name="roleType" label="角色" rules={[{required: true, message: 'Please select role type'}]}>
            <Select onChange={(value)=>changeRole(value)}>
              {rolesList.map((item) => {
               return <Option key={item.id} value={item.id}>
                  {item.roleName}
                </Option>
              })}
            </Select>
          </Form.Item>
        </Form>
  )
})


export default UserForm