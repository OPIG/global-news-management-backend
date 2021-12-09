# global-news-management-backend

## react-router-dom v6

react-router-dom v6 : https://zhuanlan.zhihu.com/p/427572601

新版问题解决方式整理 https://blog.csdn.net/Aquamay/article/details/121590592

### 嵌套路由写法一
```jsx
  
  // NewsSandBox.js
  <Routes>
    {/* 注意：默认项添加index属性且没有path属性 */}
      <Route index element={<Home/>}></Route>
      <Route path="user-manage/list" element={<UserList/>}></Route>
      <Route path="*" element={<NoPermission/>}></Route>
  </Routes>

```

```jsx
 // IndexRouter.js 注意path是 /*
 <HashRouter>
    <Routes>
      <Route path="/*" element={<NewsSandBox/>}></Route>
    </Routes>
 </HashRouter>

```

### 嵌套路由写法二

```jsx
  // NewsSandBox.js
  import { Outlet } from 'react-router-dom'

  <Outlet/>

```

```jsx
 // IndexRouter.js 注意path是 /
 {/* Route嵌套配合Outlet实现嵌套 */}
 <Route path="/" element={<NewsSandBox/>}>
 {/* 注意：默认项添加index属性且没有path属性 */}
    <Route index element={<Home/>}></Route>
    <Route path="user-manage/list" element={<UserList/>}></Route>
    <Route path="*" element={<NoPermission/>}></Route>
</Route>

```

### create-react-app 完整配置别名alias方法
<https://www.cnblogs.com/diantao/p/13354991.html>
<https://medium.com/deskera-engineering/creating-path-aliases-in-create-react-app-with-react-app-rewired-c2cde81b472>

1、安装依赖

```js
npm install react-app-rewired --save-dev
npm install customize-cra --save-dev

```　　

2、根目录创建config-overrides.js文件，注意名字不要写错，内容如下

``` js
const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = override(
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src")
    })
)
　　
```

3、修改package.json的scripts部分，如下

```js
"dev": "react-app-rewired start",
"build:prod": "react-app-rewired build"
```

原来由react-scripts启动/打包的改成以`react-app-rewired`打包/启动



==================================

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
