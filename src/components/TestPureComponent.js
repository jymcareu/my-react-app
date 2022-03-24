/*
 * @Author: your name
 * @Date: 2022-02-03 20:49:54
 * @LastEditTime: 2022-03-24 15:52:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/TestPureComponent.js
 */
import React from "react";
class ListOfWords extends React.PureComponent {
	render() {
		return <div>{this.props.words.join(",")}</div>;
	}
}

class WordAdder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			words: ["marklar"],
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState((state) => ({
			words: [...state.words, "marklar"],
		}));
	}

	render() {
		return (
			<div>
				<button onClick={this.handleClick}>新增</button>
				<ListOfWords words={this.state.words} />
			</div>
		);
	}
}

export default WordAdder;
