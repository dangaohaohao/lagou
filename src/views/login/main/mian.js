


(function() {

  // 进入页面默认是普通登录方式
  let $mobile = $('.waysByPhone .mobile');

  // 点击进入手机登录界面
  $mobile.click(function() {

    if ($(this).text() == '手机号登录') {
      $('.loginCommon').addClass('hideNone');
      $('.loginByPhone').removeClass('hideNone');
      $(this).text('密码登录');
    }else {
      $('.loginCommon').removeClass('hideNone');
      $('.loginByPhone').addClass('hideNone');
      $(this).text('手机号登录');
    }
  
  });

  // 点击注册跳转到注册页面
  $('.waysByPhone .register').click(function() {
    window.location.href = './register.html';
  });


  
// ##### 登陆，获得验证码
// api: /api/user/login/get_code
// method: GET
// 参数： tel
// 返回值 ： message     status     data

// ##### 登陆，校验验证码
// api: /api/user/login/confirm_code
// method: POST
// 参数： tel   code
// 返回值 ： message     status     data

  // 手机号登录：当点击发送验证码时，首先获取到输入框的值，校验手机号
  // 正确则发送 请求，得到验证码
  // 点击登录时，获取到值一起发送给后端，正确则跳转到 mime 页面
  $('.loginByPhone .getCode').click(function() {
    let tel = $('.loginByPhone .tel input').val();
    if (!tel) {
      alert('手机号不可为空');
      return;
    }
    if (/^1[3456789]\d{9}$/.test(tel)) {
      // 手机号格式正确
      getCode(tel, function() {
        // 开始倒计时，60秒后恢复成获取验证码
        let num = 60;
        $('.loginByPhone .getCode').text(num);
        let timer = setInterval(() => {
          num --;
          $('.loginByPhone .getCode').text(num);
          if (num <= 0) {
            clearInterval(timer);
            $('.loginByPhone .getCode').text('获取验证码');
          }
        }, 1000);
      });
    
    }else {
      alert('请输入正确的手机号');
      return;
    }
  });

  $('.loginWrap .login').click(function() {
    // 获取到手机号 和 验证码
    let tel = $('.loginByPhone .tel input').val();
    let code = $('.loginByPhone .psw input').val();

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

    loginIn(tel, code, function() {
      // 校验成功，跳转到 mime 页面
      window.location.href = './mime.html';
      localStorage.setItem('isLogin', 'true');
    });


  });


})();

