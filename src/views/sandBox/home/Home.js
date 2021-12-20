import React, { useEffect} from 'react'
import {getAllRightsList} from '@/api'
import { Button } from 'antd'

export default function Home() {
  const getData1 = () => {
    getAllRightsList()
  }
  return (
    <div>
      home
      <Button type="warn" onClick={getData1}> click me</Button>
    </div>
  )
}
