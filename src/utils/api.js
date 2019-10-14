var HOST = 'http://localhost:8000';

//首页的职位列表
var HOME_JOBS_API = HOST + '/api/jobs/list';

// 职位详情数据的接口
var JOB_DETAIL_API = HOST + '/api/jobs/detail';

// 发送验证码的api
var SEND_CODE_API = HOST + '/api/user/get_code';

// 登录的校验验证码
var LOGIN_API = HOST + '/api/user/login/confirm_code';

// 注册的api
var REGIESTER_API = HOST + '/api/user/regiester/confirm_code';

// 用户注销
var LOGOUT_API = HOST + '/api/user/login_out';

// 搜索职位关键字搜索列表
var SEARCH_BY_KEY = HOST + '/api/jobs/jobs_list/by_keyword';

// 投递简历
var DELIVER_RESUME = HOST + '/api/user/delive/resume';

// 面试列表
var INTERVIEW_LIST = HOST + '/api/user/resume_list';

// 查询公司的职位列表
var COMPANY_JOB_LIST = HOST + '/api/jobs/list_by_company';

// 查询公司基本信息
var COMPANY_INFO = HOST + '/api/company_info/by_id';


