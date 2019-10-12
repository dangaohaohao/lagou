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

