// import React from 'react'
// const AllPlayer = () => (
//   <div>
//     <h1>我是player页</h1>
//   </div>
// )
// export default AllPlayer

import React, { useEffect } from 'react'
import PlayerAPI from '../api'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AllPlayer = () => {
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    //axios.defaults.withCredentials = true
    // axios.get("https://192.168.1.161:8000/api/v1/component/componenttree").then((res)=>{
    //   console.info(res)
    // })
    axios({
      method: 'get',
      url: 'http://192.168.1.161:8000/api/v1/component/componenttree',
      data: true,
      withCredentials: true
    }).then((res) => {
      console.info(res)
    })
  });
  return (
    <div>
      <ul>
        {
          PlayerAPI.all().map(p => (
            <li key={p.id}>
              <Link to={`/player/${p.id}`}>{p.name}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default AllPlayer



