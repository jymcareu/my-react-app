/*
 * @Author: your name
 * @Date: 2022-03-24 15:50:23
 * @LastEditTime: 2022-03-24 16:21:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/Topic.js
 */
// 嵌套路由
import React from 'react';
import { Routes, Route, Link, useMatch, Outlet, useLocation, useParams } from "react-router-dom";
/*
  useRouteMatch, useParams 为新版Hooks新增项
*/
const Topics = () => {
//   let match = useParams();
//   let match = useMatch();
  let location = useLocation();
//   console.log(match, 'match')
  console.log(location, 'location')
  return(
    <div>
      <div>
        <h2>Nested Routing</h2>
        {/* 所有内容均需放进 <Router>内 */}
          {/* 嵌套路由按钮 */}
          <ul>
            <nav>
              <Link to={`components`}>
                Components
              </Link>
              <Link to={`props-v-state`}>
                Props v. State
              </Link>
            </nav>
          </ul>

          {/* 嵌套路由内容 */}
          <Routes>
            <Route path="user" element={<Users />}>
                <Route path=":topicId" element={<Topic />}></Route>
                <Route path="test" element={<h3>Please select a topic.</h3>}></Route>
            </Route>
          </Routes>
      </div>
    </div>
  )
}

function Topic() {
  let { topicId } = useParams();
  console.log(topicId, 'topicId')
  return <h3>Requested Routing ID: {topicId}</h3>;
}

function Users() {
    return (
      <div>
        <h1>Users</h1>
        <Outlet />
      </div>
    );
  }

export default Topics;