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