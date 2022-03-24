/*
 * @Author: your name
 * @Date: 2022-02-19 15:08:39
 * @LastEditTime: 2022-02-19 15:22:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/testHook.js
 */
import React, { useState, useEffect } from "react";

function ChangeTitle() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `You clicked ${count} times`;
	});

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}

export default ChangeTitle
