/*
 * @Author: your name
 * @Date: 2022-02-03 14:07:45
 * @LastEditTime: 2022-02-05 23:16:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/testHOCDemo.js
 */
import React from "react";
import logProps from "./hocComponentRef";
class FancyButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: props.refresh,
		};
	}
	ref = null;
	componentDidMount() {
		const val = React.Children.toArray(this.props.children, function(child) {
			console.log(child)
		})
		console.log(val)
	}
	componentDidUpdate() {
		console.log(this.props);
	}
	onFocus = () => {
		this.ref.current.focus();
	};
	render() {
		const { inputref, ...rest } = this.props;
		this.ref = inputref;
		return (
			<div>
				<button {...rest} onClick={this.onFocus} className="FancyButton">
					{this.props.children}
				</button>
				&nbsp;
				<input ref={this.ref}></input>
			</div>
		);
	}
}
export default logProps(FancyButton);
