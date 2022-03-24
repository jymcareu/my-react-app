<!--
 * @Author: your name
 * @Date: 2022-02-03 14:44:35
 * @LastEditTime: 2022-02-19 17:12:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-react-app/react_study.md
-->

### JSX

1. 建议使用大写字母开头命名自定义组件。如果以小写字母开头的组件，则在 `JSX` 中使用它之前，必须将它赋值给一个大写字母开头的变量。
2. `JSX`类型不能是一个表达式。可以是大写字母开头的变量。

---

### 生命周期

> 官方生命周期图：https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

- #### 挂载：当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下。

1. `constructor(props)`，不初始化 state、不进行方法绑定，就不需要为 React 组件实现构造函数。在 React 组件挂载之前，会调用它的构造函数。
2. `static getDerivedStateFromProps(nextProps, prevState)`，在 render 方法之前执行。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
3. `render()` 方法是 class 组件中唯一必须实现的方法。
4. `componentDidMount()`，这个方法会在组件挂载后（插入 DOM 树中）立即调用。

- #### 更新：当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下。

1. `static getDerivedStateFromProps()`
2. `shouldComponentUpdate(nextProps, nextState)`，当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。<font color="#F4606C">注：官方建议尽量不要使用，后续版本可能会更改其功能，返回 false 可能仍会进行重新渲染</font>
3. `render()`
4. `getSnapshotBeforeUpdate(prevProps, prevState)`，在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()
5. `componentDidUpdate(prevProps, prevState, snapshot)`，当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。

- 卸载，当组件从 DOM 中移除时会调用如下方法：

1. `componentWillUnmount()`：会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。

- #### 错误处理。当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

1. `static getDerivedStateFromError(error)`：此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state。<font color="#F4606C">注： 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()。</font>
2. `componentDidCatch(error, info)`：此生命周期在后代组件抛出错误后被调用，会在“提交”阶段被调用，因此允许执行副作用。

- 其他 API：

1. `setState(updater, [callback])`：将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。

```javascript
this.setState((state, props) => {
	return { counter: state.counter + props.step };
});
```

2. `forceUpdate()`,如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()。但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法。如果标记发生变化，React 仍将只更新 DOM。

---

### refs 转发

1. 我们通过调用 `React.createRef` 创建了一个 React ref 并将其赋值给 `ref` 变量
2. 我们通过指定 ref 为 JSX 属性，将其向下传递给 `<FancyButton ref={ref}>`
3. React 传递 ref 给 `forwardRef` 内函数 `(props, ref) => ...`，ref 作为其第二个参数。
4. 我们向下转发该 `ref` 参数到 `<button ref={ref}>`，将其指定为 JSX 属性。
5. 当 ref 挂载完成，`ref.current` 将指向 `<button> `DOM 节点。

> 注：第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。

设置 `ref` 方法二:

```javascript
class CustomTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.textInput = null;
		this.setTextInputRef = (element) => {
			this.textInput = element;
		};
	}
	componentDidMount() {
		// 组件挂载后，让文本框自动获得焦点
		this.focusTextInput();
	}
	render() {
		// 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
		// 实例上（比如 this.textInput）
		return (
			<div>
				<input type="text" ref={this.setTextInputRef} />
			</div>
		);
	}
}
```

- 为 class 组件添加`Ref`，当子组件是 class 声明时，父组件可通过这个 `ref.current` 来获得子组件对象，使用其定义的方法。

---

### Fragments

1. 相当于 vue 的`template`标签。
2. `key` 是唯一可以传递给 `Fragment` 的属性。
3. 短语法：`<></>`, 不支持任何属性。

---

### Suspense

> Suspense 使得组件可以“等待”某些操作结束后，再进行渲染。

1. `React.lazy`：React.lazy() 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。<font color="pink">使用 React.lazy 的动态引入特性需要 JS 环境支持 Promise。在 IE11 及以下版本的浏览器中需要通过引入 polyfill 来使用该特性。</font>

```javascript
const SomeComponent = React.lazy(() => import("./SomeComponent"));
```

2. `React.Suspense`：

```javascript
function MyComponent() {
	return (
		// 显示 <Spinner> 组件直至 OtherComponent 加载完成
		<React.Suspense fallback={<Spinner />}>
			<div>
				<SomeComponent />
			</div>
		</React.Suspense>
	);
}
```

---

### Context

> Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props

1. 通过 `const Context = React.createContext()` 创建 `Context` 对象，可传默认值。
2. 再通过 `Context.Provider` + 属性值 `value` 分发下去。
3. 挂载在 class 上的 `contextType` 属性会被重赋值为一个由 `React.createContext()` 创建的 `Context` 对象。这能让你使用 `this.context` 来消费最近 `Context` 上的那个值。你可以在任何生命周期中访问到它，包括 `render` 函数中。
4. `Context.Consumer` ，需要函数作为子元素，传递给函数的 value 值等同于往上组件树离这个 `context` 最近的 `Provider` 提供的 value 值。如果没有对应的 `Provider`，value 参数等同于传递给 `createContext()` 的 `defaultValue`。
5. `Context.displayName`, 将`context`对象的名称在 `React DevTools` 中重命名.

---

### 高阶组件 HOC

> 高阶组件是参数为组件，返回值为新组件的函数。
> HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

---

### Portal

> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案

```javascript
ReactDOM.createPortal(child, container);
```

第一个参数 `child` 是任何可渲染的 `React` 子元素，例如一个元素，字符串或 fragment。第二个参数 `container` 是一个 DOM 元素。

---

### React 提供的一些 API

1. `React.cloneElement( element, [config], [...children] )`

> 以 element 元素为样板克隆并返回新的 React 元素。config 中应包含新的 props，key 或 ref。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，如果在 config 中未出现 key 或 ref，那么原始元素的 key 和 ref 将被保留。

2. `React.isValidElement(obj)`

   > 验证对象是否为 React 元素，返回值为 true 或 false。

3. `React.children`
   > React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。

- `React.Children.map(children, function[(thisArg)])`：遍历每个子节点并执行后面的方法。如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组。如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历。只对子元素有效，孙子元素无效。
- `React.Children.forEach`：与 React.Children.map() 类似，但它不会返回一个数组。
- `React.Children.count`：返回 children 中的组件总数量，等同于通过 map 或 forEach 调用回调函数的次数。
- `React.Children.only`：验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误。（emmm，这个到底有啥用）
- `React.Children.toArray`：将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。当你想要在渲染函数中操作子节点的集合时，它会非常实用，特别是当你想要在向下传递 this.props.children 之前对内容重新排序或获取子集时。

---

### 性能优化

1. `shouldComponentUpdate`，在重新渲染前（render 之前）会触发，如果有一些非必要更新可在该方法中对是否需要渲染进行手动控制。返回值默认为 true，不更新可返回 false。

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

- `React.PureComponent`，对 `shouldComponentUpdate` 进行了简单封装。对 props、state 的值进行了浅比较。（暂时感觉无实际使用意义）。

2. 使用 `Chrome Performance`、`React dev tools 中的 profile` 标签分析组件。查看各组件渲染使用时间。

---

### React Hook

> 只能在 React 的函数组件中调用 Hook。Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。例如，useState 是允许你在 React 函数组件中添加 state 的 Hook。

#### 1. State Hook —— useState()

```javascript
import React, { useState } from "react";
const [count, setCount] = useState(0);
```

- `count`: `useState` 返回的第一个 state 变量。
- `setCount`: `useState` 返回的第二个值，用于更新 state 变量的函数。

#### 2. Effect Hook —— useEffect()

> 可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

```javascript
import React, { useState, useEffect } from "react";
useEffect(() => {
	function handleStatusChange(status) {
		setIsOnline(status.isOnline);
	}

	ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
	return () => {
		ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
	};
});
```
- 每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。