/*
 * @Author: your name
 * @Date: 2022-02-04 23:33:06
 * @LastEditTime: 2022-02-04 23:40:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/testRenderProp.js
 */
// <Mouse> 组件封装了我们需要的行为...
import React from "react";
class Mouse extends React.Component {
	constructor(props) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.state = { x: 0, y: 0 };
	}

	handleMouseMove(event) {
		this.setState({
			x: event.clientX,
			y: event.clientY,
		});
	}

	render() {
		return (
			<div
				style={{ width: "200px", height: "200px" }}
				onMouseMove={this.handleMouseMove}
			>
				{/* ...但我们如何渲染 <p> 以外的东西? */}
				{this.props.children(this.state)}
			</div>
		);
	}
}

class Cat extends React.Component {
	render() {
		const mouse = this.props.mouse;
		return (
			<div
				style={{
					width: "50px",
					height: "50px",
					background: "#000",
					position: "absolute",
					left: mouse.x,
					top: mouse.y,
				}}
			/>
		);
	}
}

class MouseTracker extends React.Component {
	render() {
		return (
			<div>
				<h1>移动鼠标!</h1>
				<Mouse>
					{(mouse) => (
						<Cat mouse={mouse}></Cat>
					)}
				</Mouse>
			</div>
		);
	}
}

export default MouseTracker;
