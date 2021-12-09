import React, { useEffect} from 'react'
import {getNavbarList} from '@/api'
import { Button } from 'antd'

export default function Home() {
  const getData1 = () => {
    getNavbarList()
  }
  return (
    <div>
      home
      <Button type="warn" onClick={getData1}> click me</Button>
    </div>
  )
}
