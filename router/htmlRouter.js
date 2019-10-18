// 内置模块

// 第三方模块
const express = require('express');
// 自定义模块 
// 使用 gulp 开服务器
// const httpProxy = require('../middleware/http-proxy-middleware');

// 创建一个 router 实例
const htmlRouter = express.Router();


// 首页
htmlRouter.get('/', (req, res) => {
  res.redirect('home');
});

// home.html
htmlRouter.get('/home', (req, res) => {
 res.render('home');
});

// search.html
htmlRouter.get('/search', (req, res) => {
  res.render('search');
});

// mime.html
htmlRouter.get('/mime', (req, res) => {
  res.render('mime');
});

// login.html
htmlRouter.get('/login', (req, res) => {
  res.render('login');
});

// register.html
htmlRouter.get('/register', (req, res) => {
  res.render('register');
});

// jobDetail.html
htmlRouter.get('/jobDetail', (req, res) => {
  res.render('jobDetail');
});

// interview.html
htmlRouter.get('/interview', (req, res) => {
  res.render('interview');
});

// company.html
htmlRouter.get('/company', (req, res) => {
  res.render('company');
});

// deliver.html
htmlRouter.get('/deliver', (req, res) => {
  res.render('deliver');
});


module.exports = htmlRouter;
