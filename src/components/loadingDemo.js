/*
 * @Author: your name
 * @Date: 2022-02-01 15:30:05
 * @LastEditTime: 2022-02-04 12:08:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/loading_demo.js
 */
import React, { lazy, Suspense } from "react";
import ContextApp from '../js/context.js'
import FatherApp from "../js/context2.js";
import RefForward from './RefForward.js'
const OtherComponent = lazy(() => import("./testContent"));

class MyComponent extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    // throw new Error("I'm wrong")  //测试ErrorBoundary
  }

  setFocus = () => {
    this.ref.current.focus()
  }
	render() {
		return (
      <FatherApp.Consumer>
        {
          data1 => {
            console.log(data1)
            return (
              <ContextApp.Consumer>
              {
                (obj) => {
                  console.log(obj)
                  return (
                    <div>
                      <Suspense fallback={<div>Loading...</div>}>
                        <OtherComponent />
                      </Suspense>
                      <RefForward ref={this.ref} onClick={this.setFocus}>
                        测试
                      </RefForward>
                    </div>
                  )
                }
              }
              </ContextApp.Consumer>
            )
          }
        }
      </FatherApp.Consumer>
      
		);
	}
}
export default MyComponent;
