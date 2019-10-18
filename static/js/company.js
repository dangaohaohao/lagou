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
var HOST = 'http://localhost:3000';

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
    window.location.href = '/home';
  });

})();


// 当点击 tag 的时候，发送 ajax 请求数据

// ##### 查询公司的职位列表
// api: /api/jobs/list_by_company
// method: GET
// 参数： id(Y)   category_id(Y)
// 返回值：  message     status     data
// COMPANY_JOB_LIST

// 先暂时这样

function getCompanyJobList(id, category_id, cb) {
  $.ajax({
    type: 'get',
    url: COMPANY_JOB_LIST,
    data: {id: id, category_id: category_id},
    success: function(data) {
      if (data.status == 0) {
        cb(data.data);
      }else {
        console.log('获取公司职位列表出错');
      }
    },
    error: function(err) {
      console.log('网络繁忙, 请稍后再试');
    }
  });
}

 // 创建 dom 
 function createListDom(data) {
  let itemDom = '';
  for (let i = 0, len = data.length; i < len; i++) {
    let item = data[i];
    itemDom += '  <li class="list-item border-bottom" data-id="'+item.id+'" data-job="'+item.job+'">\
    <div class="center">\
      <h3 class="title">' + item.job + '</h3>\
      <p class="time">' + item.publish + '</p>\
    </div>\
    <div class="right text-center">' + item.minSalary + 'k-' + item.maxSalary + 'k</div>\
  </li>';
  }
  return itemDom;
}

// 渲染首屏页面
getCompanyJobList(1, 1, function(data) {
  let listDom = createListDom(data);
  $('.list').html(listDom);
});

$('.classify').on('click', '.tag', function() {
  $(this).addClass('selected').siblings().removeClass('selected');
  getCompanyJobList(3, 4, function(data) {
    let listDom = createListDom(data);
    $('.list').html(listDom);
  })
});

let $list = $('.content .list');
  // 给每一个 item 添加点击事件
  $list.on('click', '.list-item', function() {

  let id = $(this).attr('data-id');
  let job = $(this).attr('data-job');

  sessionStorage.setItem('job-params', JSON.stringify({
    id,
    job
  }));
  window.location.href = '/jobDetail';
});


(function() {

// ###### 公司基本信息 自己加的
// api: /api/company_info/by_id
// method： GET
// 参数：id
// 返回值： message     status     data
// COMPANY_INFO


function getCompanyInfo(id, cb) {
  $.ajax({
    type: 'get',
    url: COMPANY_INFO,
    data: {id: id},
    success: function(data) {
      if (data.status == 0) {
        cb();
      }else {
        console.log('数据请求失败');
      }
    },
    error: function() {
      console.log('网络繁忙，请稍后再试');
    }
  });
}

let companyScroll = new IScroll('.content', {
  tap: true,
  click: true
});



})();

