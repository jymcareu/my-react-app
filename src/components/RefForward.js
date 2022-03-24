/*
 * @Author: your name
 * @Date: 2022-02-01 22:55:29
 * @LastEditTime: 2022-02-01 23:10:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/refForward.js
 */
import React from "react";
const FancyButton = React.forwardRef((props, ref) => (
    <div>
        <button {...props} className="FancyButton">
            {props.children}
        </button>
        &nbsp;
        <input ref={ref}></input>
    </div>
));
export default FancyButton;
