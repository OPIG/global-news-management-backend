import axios from 'axios'
import React, {useEffect} from 'react'
import Style from  "./child.module.scss"

export default function Child() {
  useEffect(() => {
    axios.get("/bdNews/widget?id=LocalNews&ajax=json&t=1637779146647").then(res=>{
      console.log(res, '======')
    })
  }, [])
  return (
    <div>
      <ul>
        <li>this is test</li>
        <li>this is second</li>
      </ul>
      <span className={Style.test} style={{fontFamily: "stonefont"}}>
        test content - child  &#xec53;&#xf218;&#xf439;.&#xe03d;&#xe03d;
      </span>
    </div>
  )
}
