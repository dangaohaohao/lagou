(function () {

  // 需要看用户是否登录
  let isLogin = checkLogin();
  if (isLogin) {
    // 登录了 点击去对应的页面
    $('.login').addClass('hideNone');

    $('#resume').click(function () {
      // window.location.href = './resume.html';
      console.log('去编辑简历');
    });

    $('.list').on('click', '.list-item', function () {
      let index = $(this).index();
      switch (index) {
        case 0:
          // window.location.href = './deliver.html';
          console.log('去投递页面');
          break;
        case 1:
          // window.location.href = './interview.html';
          console.log('去面试页面');
          break;
        case 2:
          // window.location.href = './collect.html';
          console.log('去收藏页面');
          break;
      }
    });

    // 点击注销
    $('.loginout').click(function() {
      loginOut(function() {
        localStorage.removeItem('isLogin');
        location.reload();
      });
    });


  } else {
    // 未登录 任何页面点击都是跳转去登录页面
    $('.user').addClass('hideNone');
    $('.loginout').remove();

    $('.login').click(function () {
      window.location.href = './login.html';
      console.log('去登录');
    });

    $('.list').on('click', '.list-item', function () {
      window.location.href = './login.html';
      console.log('去登录');
    });

  }



})();