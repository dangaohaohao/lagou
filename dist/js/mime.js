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

(function() {
  
// 首先 tabbar 是动态渲染上去的，后期可能会再进行添加

function initTabbar(data) {
  let $list = $('.tabbar .list');

  let tabbarTemplate = '<a href="{{href}}" class="list-item text-center {{active}}">\
<span class="iconfont {{icon}}"></span>\
<span>{{text}}</span>\
</a>';

  let tabbarItemTemplate = '';

  // 判断当前的路径
  let arr = window.location.href.split('/');
  let page = arr[arr.length-1].split('.');
  let currentPath = page[0];

for (let i = 0, len = data.length; i < len; i ++) {
  let item = data[i];
  let tabbarItemDom = tabbarTemplate.replace(/{{href}}/, item.href);
  tabbarItemDom = tabbarItemDom.replace(/{{icon}}/, item.icon);
  tabbarItemDom = tabbarItemDom.replace(/{{text}}/, item.text);
  tabbarItemDom = tabbarItemDom.replace(/{{active}}/, (currentPath == item.id ? 'active': ''));
  tabbarItemTemplate += tabbarItemDom;
}

$list.append(tabbarItemTemplate);

}


let tabbar = [{
    id: 'home',
    href: './home.html',
    icon: 'icon-shouye',
    text: '职位'
  },
  {
    id: 'search',
    href: './search.html',
    icon: 'icon-sousuo',
    text: '搜索'
  },
  {
    id: 'mime',
    href: './mime.html',
    icon: 'icon-wode',
    text: '我的'
  }
];


initTabbar(tabbar);

})();

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