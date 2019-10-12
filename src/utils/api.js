var HOST = 'http://localhost:8000';

//首页的职位列表
var HOME_JOBS_API = HOST + '/api/jobs/list';

// 职位详情数据的接口
var JOB_DETAIL_API = HOST + '/api/jobs/detail';

// 发送验证码的api
var SEND_CODE_API = HOST + '/api/user/get_code';

// 登录的校验验证码
var LOGIN_API = '/api/user/login/confirm_code';

// 注册的api
var REGIESTER_API = '/api/user/regiester/confirm_code';

// 用户注销
var LOGOUT_API = '/api/user/login_out';