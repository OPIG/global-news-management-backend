import axios from 'axios'
const base_url = 'http://localhost:3001'

export function getNavbarList() {
  axios.get(base_url+'/rights?_embed=children').then(res=>{
    return res.data
  })
}