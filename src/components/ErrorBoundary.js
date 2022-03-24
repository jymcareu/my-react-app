/*
 * @Author: your name
 * @Date: 2022-02-01 21:44:54
 * @LastEditTime: 2022-03-24 13:25:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/ErrorBoundary.js
 */
import React from "react";
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// 更新 state 使下一次渲染能够显示降级后的 UI
		console.log(error)
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// 你同样可以将错误日志上报给服务器
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// 你可以自定义降级后的 UI 并渲染
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}
export default ErrorBoundary;
