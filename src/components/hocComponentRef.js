/*
 * @Author: your name
 * @Date: 2022-02-03 00:01:21
 * @LastEditTime: 2022-02-03 14:57:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/src/components/hocComponent_ref.js
 */
import React from "react";
function logProps(Component) {
	class LogProps extends React.Component {
		componentDidUpdate(prevProps) {
			console.log("old props:", prevProps);
			console.log("new props:", this.props);
		}

		render() {
			const { forwardedRef, ...rest } = this.props;

			// 将自定义的 prop 属性 “forwardedRef” 定义为 ref
			return <Component inputref={forwardedRef} {...rest} />;
		}
	}
	function forwardRef(props, ref) {
		return <LogProps {...props} forwardedRef={ref} />;
	}
    const name = Component.displayName || Component.name;
    forwardRef.displayName = `logProps(${name})`;
	// 注意 React.forwardRef 回调的第二个参数 “ref”。
	// 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
	// 然后它就可以被挂载到被 LogProps 包裹的子组件上。
	return React.forwardRef(forwardRef)
}
export default logProps;
