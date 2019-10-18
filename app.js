// 内置模块
const path = require('path');
// 第三方模块
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const ejs = require('ejs');
// 自定义模块
const ajaxRouter = require('./router/ajaxRouter');
const htmlRouter = require('./router/htmlRouter');

// 创建一个 express 实例
const app = express();

//设置跨域访问 允许所有 在这里也可以设置允许用户访问什么内容
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// 使用模板引擎
app.set('view cache', false);
app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 处理静态资源  ajax请求 页面
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/api', ajaxRouter);
app.use(htmlRouter);

app.listen(3000, 'localhost', (err) => {
  let pathStr = `有一个服务运行在: http:localhost:3000`;
  console.log(`${chalk.green(pathStr)}`);
});