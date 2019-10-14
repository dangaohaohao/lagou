function resetRemUnit(){

  // 获得设备像素比
  var radio = window.devicePixelRatio;
  // 处理设备像素比，只能是1，2，3
  radio = radio >= 3 ? 3 : (radio >= 2 ? 2 : 1);
  // 判断是否有meta标签
  var viewportDOM = document.querySelector('meta[name=viewport]');
  if(!viewportDOM){
    viewportDOM = document.createElement('meta');
    viewportDOM.setAttribute('name', 'viewport');
  }
  // 计算页面缩放比例
  var scale = 1 / radio; 
  var content = 'width=device-width, initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no';
  viewportDOM.setAttribute('content', content);
  // 添加meta标签
  document.head.appendChild(viewportDOM);


  // 控制计算rem的最大最小适配页面
  var min = 320 * radio;
  var max = 540 * radio;
  var width = document.documentElement.clientWidth || window.innerWidth || document.documentElement.getBoundingClientRect().width;
  if(width < min){
    width = min;
  }else if(width > max){
    width = max;
  }
  // 计算rem
  document.documentElement.style.fontSize = (width * 100 / 640) + 'px';
}

resetRemUnit();
window.onresize = resetRemUnit;
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



// 关于用户的操作

// 是否登录
function checkLogin() {
  let isLogin = localStorage.getItem('isLogin') == 'true' ? true : false;
  return isLogin;
}

// 用户注销
function loginOut(cb) {
  $.ajax({
    type: 'get',
    url: LOGOUT_API,
    success: function (data) {
      console.log(data);
      if (data.status == 0) {
        // 注销成功
        cb();
      } else {
        console.log('退出失败');
      }

    },
    error: function (err) {
      console.log('网络繁忙，请稍后再试');
    }
  });
}

// 获取验证码
function getCode(tel, cb) {
  $.ajax({
    url: SEND_CODE_API,
    type: 'GET',
    data: {tel: tel},
    success: function (data) {
      if (data.status == 0) {
        // 成功发送验证码
        cb();
      }else {
        console.log('验证码发送失败');
      }
    },
    error: function (err) {
      console.log('网络繁忙，请稍后再试');
    }
  })
}

// 验证登录的验证码
function loginIn(tel, code, cb) {
  $.ajax({
    type: 'post',
    url: LOGIN_API,
    data: {tel: tel, code: code},
    success: function(data) {
      if (data.status == 0) {
        // 登录成功
        cb();
      }else {
        console.log('登录失败');
      }
    },
    error: function(err) {
      console.log('登录失败');
    }
  });
}

// 用户注册
function register(tel, code, cb) {
  $.ajax({
    type: 'post',
    url: REGIESTER_API,
    data: {tel: tel, code: code},
    success: function(data) {
      if (data.status == 0) {
        // 注册成功
        cb();
      }else {
        console.log('注册失败');
      }
    },
    error: function(err) {
      console.log('网络繁忙，请稍后再注册');
    }
  });
}



(function () {

  // 点击返回按钮，返回上一页
  $('.back-action').click(function () {
    history.back();
  });

  // 点击主页，来到主页面
  $('.home-action').click(function() {
    window.location.href = './home.html';
  });

})();

(function () {

  // 点击登录跳转到登录页面
  $('.waysByPhone .login').click(function () {
    window.location.href = './login.html';
  });

  // ##### 登陆， 校验验证码
  // api: /api/user / login / confirm_code
  // method: POST
  // 参数： tel code
  // 返回值： message status data

  // 手机号注册：当点击发送验证码时，首先获取到输入框的值，校验手机号
  // 正确则发送 请求，得到验证码
  // 点击注册时，获取到值一起发送给后端，正确则跳转到 mime 页面 注册成功
  $('.registerByPhone .getCode').click(function () {
    let tel = $('.registerByPhone .tel input').val();
    if (!tel) {
      alert('手机号不可为空');
      return;
    }
    if (/^1[3456789]\d{9}$/.test(tel)) {
      // 手机号格式正确
      getCode(tel, function () {
        // 开始倒计时，60秒后恢复成获取验证码
        let num = 60;
        $('.registerByPhone .getCode').text(num);
        let timer = setInterval(() => {
          num--;
          $('.registerByPhone .getCode').text(num);
          if (num <= 0) {
            clearInterval(timer);
            $('.registerByPhone .getCode').text('获取验证码');
          }
        }, 1000);
      });

    } else {
      alert('请输入正确的手机号');
      return;
    }
  });


  $('.registerWrap .register').click(function () {
    // 获取到手机号 和 验证码
    let tel = $('.registerByPhone .tel input').val();
    let code = $('.registerByPhone .psw input').val();

    if (!tel) {
      alert('手机号不可为空');
      return;
    }
    if (!code) {
      alert('验证码不可为空');
      return;
    }

    if (!(/^1[3456789]\d{9}$/.test(tel))) {
      alert('请输入正确的手机号');
      return;
    }

    register(tel, code, function () {
      // 注册成功，跳转到 mime 页面
      window.location.href = './mime.html';
      localStorage.setItem('isLogin', 'true');
    });


  });




})();