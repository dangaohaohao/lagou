const Mock = require('mockjs');
const url = require('url');

let map = {
  // 请求工作列表
  '/api/jobs/list'(response) {
    let obj = Mock.mock({
      message: 'ok',
      status: 0,
      'data|10': [
        {
          'id|+1': 1,
          'company': '@ctitle',
          'companyPic': '@image(120x120, @color, @color, @name)',
          'job|1': ['前端开发工程师', 'php开发工程师', '产品经理'],
          'city': '@city',
          'minSalary|8-10': 0,
          'maxSalary|10-15': 0,
          'publish': '@date'
        }
      ]
    });
    let result = JSON.stringify(obj);

    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    setTimeout(function() {
      response.end(result);
    });
  },
  // 请求注销
  '/api/user/login_out'(response) {
    let obj = Mock.mock({
      message: 'ok',
      status: 0
    });
    let result = JSON.stringify(obj);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(result);
  },
  // 获取验证码
  '/api/user/get_code'(response) {
    let obj = Mock.mock({
      message: 'ok',
      status: 0
    });
    let result = JSON.stringify(obj);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(result);
  },
  // 校验登录验证码
  '/api/user/login/confirm_code'(response) {
    let obj = Mock.mock({
      message: 'ok',
      status: 0
    });
    let result = JSON.stringify(obj);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(result);
  },
  // 用户注册
  '/api/user/regiester/confirm_code'(response) {
    let obj = Mock.mock({
      message: 'ok',
      status: 0
    });
    let result = JSON.stringify(obj);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(result);
  },
  // 职位详情
  '/api/jobs/detail'(response) {
    let obj = Mock.mock({
      message: 'ok',
      status: 0,
      'data|1': [
        {
          'id': 1,
          'job|1': ['前端开发工程师', 'php开发工程师', '产品经理'],
          'collect|1':[0, 1], 
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
          'companySize|1':['移动互联网/D轮及以上/500-2000人', '天使轮/20-60人', 'A轮/50-200人', 'B轮/500-1000人'],
          'logo': '@image(50x50, @color, @color, @name)',
          'jobDescription': '@csentence(100, 600)',
          'interviewWrap': '@csentence(100, 800)'
        }
      ]
    });
    let result = JSON.stringify(obj);
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.end(result); 
  },
  // 搜索职位关键字搜索列表
  '/api/jobs/jobs_list/by_keyword'(response) {
    let obj = Mock.mock({
      message: 'ok',
      status: 0,
      'data|10': [
        {
          'id|+1': 1,
          'company': '@ctitle',
          'companyPic': '@image(120x120, @color, @color, @name)',
          'job': '前端开发工程师',
          'city': '@city',
          'minSalary|8-10': 0,
          'maxSalary|10-15': 0,
          'publish': '@date'
        }
      ]
    });
    let result = JSON.stringify(obj);

    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(result);
  },
}


function mockDataMiddleware(request, response, next) {

  // 解析请求的 url 地址，取得请求 url 中的 pathname
  let {pathname} = url.parse(request.url);

  // 判断请求是否需要拦截
  map[pathname] ? map[pathname](response) : next();

}

// 向外输出
module.exports = mockDataMiddleware;