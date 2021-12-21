import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use((payload) => {
  console.log(payload, '=====')
  return payload
})

/**
 * 获取所有的权限
 * @returns Array
 */
export function getAllRightsList() {
  return new Promise((resolve, reject) => {
    axios.get('/api/rights?_embed=children').then((res) => {
      resolve(res?.data)
    }).catch(e=>{
      reject([])
    })
  })
}

/**
 * 删除一级目录
 * @param {*} id 
 * @returns 
 */
export function deleteRightsById(id) {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/rights/${id}`).then(res =>{
      resolve(res?.data)
    }).catch(e=>{
      reject()
    })
  })
}

/**
 * 删除二级目录
 * @param {*} id 
 * @returns 
 */
export function deleteChildrenRightsById(id) {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/children/${id}`).then(res =>{
      resolve(res?.data)
    }).catch(e=>{
      reject()
    })
  })
}

/**
 * 开关权限
 * @param {*} 
 * @returns 
 */
export function updatePermission(data) {
  return new Promise((resolve, reject) => {
    axios.patch(`/api/${data.type}/${data.id}`, {
      pagepermission: data.pagepermission
    }).then(res =>{
      resolve(res?.data)
    }).catch(e=>{
      reject()
    })
  })
}

/**
 * 获取角色列表
 * @param {*}
 * @returns
 */
export function getRolesList() {
  return new Promise((resolve, reject) => {
    axios.get(`/api/roles`).then(res => {
      resolve(res?.data)
    }).catch(e=>{
      reject()
    })
  })
}

export function deleteRolesById (id) {
  return new Promise((resolve, reject) => {
    axios.delete(`/api/roles/${id}`).then(res => {
      resolve(res?.data)
    }).catch(_ => {
      reject()
    })
  })
}

/**
 * 更新权限
 * @param {*} data 
 * @returns 
 */
export function patchRolesRightsById(data) {
  const { id, rights } = data
  return new Promise((resolve, reject) => {
    axios.patch(`/api/roles/${id}`, {
      rights
    }).then(res => {
      resolve(res)
    }).catch(_=>{
      reject()
    })
  })
}

export function getNavbarList() {
  axios.get('/rights?_embed=children').then((res) => {
    return res.data
  })
}

export function getRighstList () {
  return new Promise((resolve, reject) => {
    axios.get('/api/rights').then(res => {
      resolve(res?.data)
    }).catch(e=>{
      reject(e)
    })
  })
}