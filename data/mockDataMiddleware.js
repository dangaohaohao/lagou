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
    }, 1000);
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
  }
}


function mockDataMiddleware(request, response, next) {

  // 解析请求的 url 地址，取得请求 url 中的 pathname
  let {pathname} = url.parse(request.url);

  // 判断请求是否需要拦截
  map[pathname] ? map[pathname](response) : next();

}

// 向外输出
module.exports = mockDataMiddleware;