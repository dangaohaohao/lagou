const Mock = require('mockjs');
const express = require('express');
const ajaxRouter = express.Router();
const cityList = require('../data/cities.json');

// 请求工作列表
ajaxRouter.get('/jobs/list', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0,
    'data|10': [{
      'id|+1': 1,
      'company': '@ctitle',
      'companyPic': '@image(120x120, @color, @color, @name)',
      'job|1': ['前端开发工程师', 'php开发工程师', '产品经理'],
      'city': '@city',
      'minSalary|8-10': 0,
      'maxSalary|10-15': 0,
      'publish': '@date'
    }]
  }));
});

// 请求城市列表
ajaxRouter.get('/cities.json', (req, res) => {
  res.json(cityList);
});

// 请求注销
ajaxRouter.get('/user/login_out', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0
  }));
});

// 获取验证码
ajaxRouter.get('/user/get_code', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0
  }));
});

// 校验登录验证码
ajaxRouter.post('/user/login/confirm_code', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0
  }));
});

// 用户注册
ajaxRouter.post('/user/regiester/confirm_code', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0
  }));
});

// 职位详情
ajaxRouter.get('/jobs/detail', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0,
    'data|1': [{
      'id': 1,
      'job|1': ['前端开发工程师', 'php开发工程师', '产品经理'],
      'collect|1': [0, 1],
      'minSalary|8-10': 0,
      'maxSalary|10-15': 0,
      'city': '@city',
      'time|1': ['全职', '兼职', '临时工'],
      'minExperience|1-3': 0,
      'maxExperience|4-8': 0,
      'education|1': ['本科及以上', '专科', '不限', '研究生及以上'],
      'temptation': '@csentence',
      'company': '@ctitle',
      'companyPic': '@image(120x120, @color, @color, @ctitle)',
      'companySize|1': ['移动互联网/D轮及以上/500-2000人', '天使轮/20-60人', 'A轮/50-200人', 'B轮/500-1000人'],
      'logo': '@image(50x50, @color, @color, @name)',
      'jobDescription': '@csentence(100, 600)',
      'interviewWrap': '@csentence(100, 800)'
    }]
  }));
});

// 搜索职位关键字搜索列表
ajaxRouter.get('/jobs/jobs_list/by_keyword', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0,
    'data|10': [{
      'id|+1': 1,
      'company': '@ctitle',
      'companyPic': '@image(120x120, @color, @color, @name)',
      'job': '前端开发工程师',
      'city': '@city',
      'minSalary|8-10': 0,
      'maxSalary|10-15': 0,
      'publish': '@date'
    }]
  }));
});

// 投递简历
ajaxRouter.get('/user/delive/resume', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0
  }));
});

// 面试列表
ajaxRouter.get('/user/resume_list', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0,
    'data|1-10': [{
      'id|+1': 1,
      'company': '@ctitle',
      'companyPic': '@image(120x120, @color, @color, @name)',
      'job|1': ['前端开发工程师', 'php开发工程师', '产品经理'],
      'city': '@city',
      'minSalary|8-10': 0,
      'maxSalary|10-15': 0,
      'publish': '@date'
    }]
  }));
});

// 查询公司的职位列表
ajaxRouter.get('/jobs/list_by_company', (req, res) => {
  res.json(Mock.mock({
    message: 'ok',
    status: 0,
    'data|1-10': [{
      'id|+1': 1,
      'job|1': ['前端开发工程师', 'php开发工程师', '产品经理'],
      'minSalary|8-10': 0,
      'maxSalary|10-15': 0,
      'publish': '@date'
    }]
  }));
});


// 公司基本信息
ajaxRouter.get('/company_info/by_id', (req, res) => {
  res.json(Mock.mock({
    'data|1': [{
      'company': '@ctitle',
      'companyPic': '@image(120x120, @color, @color, @name)',
      'job|1': ['前端开发工程师', 'php开发工程师', '产品经理'],
      'city': '@city',
      'companySize|1': ['移动互联网/D轮及以上/500-2000人', '天使轮/20-60人', 'A轮/50-200人', 'B轮/500-1000人'],
      'logo': '@image(50x50, @color, @color, @name)',
      'category|1-6': ['技术', '产品', '金融', '运营', '市场与销售', '职能']
    }]
  }));
});

module.exports = ajaxRouter;