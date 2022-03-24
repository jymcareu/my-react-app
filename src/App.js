/*
 * @Author: your name
 * @Date: 2022-02-01 14:18:34
 * @LastEditTime: 2022-03-24 16:14:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/App.js
 */
import React, { Fragment, Profiler } from "react";
import "./App.css";
import LoadingDemo from "./components/loadingDemo";
import ContextApp from "./js/context.js";
import FatherApp from "./js/context2.js";
import ErrorBoundary from "./components/ErrorBoundary";
import Parent from "./components/testPortal.js";
import FancyButton from "./components/testHOCDemo";
import WordAdder from "./components/TestPureComponent";
import CustomTextInput from "./components/testRef";
import MouseTracker from "./components/testRenderProp";
import TestHook from './components/testHook'
import Topics from './components/Topic'
import { Routes, Route, Link } from 'react-router-dom'
const ref = React.createRef();
const callback = (...args) => {
	console.log(args);
};
class App extends React.Component {
	state = {
		counter: 0,
	};
	// componentDidMount() {
	// 	setInterval(() => {
	// 		this.setState((state) => {
	// 			return {
	// 				counter: state.counter + 1
	// 			}
	// 		})
	// 	}, 1000)
	// }
	render() {
		return (
			<ErrorBoundary>
				<React.StrictMode>
					<div className="App">
						<FatherApp.Provider value={{ another: "one" }}>
							<ContextApp.Provider value={{ lang: "zh-cn", theme: "dark" }}>
								<LoadingDemo></LoadingDemo>
							</ContextApp.Provider>
						</FatherApp.Provider>
						{/* 测试高阶组建ref传递 */}
						<FancyButton
							ref={ref}
							label="this is HOC!"
							refresh={this.state.counter}
						>
							<span>
								{`聚焦${this.state.counter}`}
							</span>
						</FancyButton>
						<MouseTracker></MouseTracker>
						<TestHook></TestHook>
						<Profiler id="Parent" onRender={callback}>
							<Parent></Parent>
						</Profiler>
						<Routes>
							<Route path="/wordAdder" element={<WordAdder></WordAdder>}></Route>
							<Route path="/input" element={<CustomTextInput />}></Route>
							<Route path="/topic/*" element={<Topics />}></Route>
						</Routes>
					</div>
				</React.StrictMode>
			</ErrorBoundary>
		);
	}
}

export default App;
