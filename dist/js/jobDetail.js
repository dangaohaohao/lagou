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




  //  loadingWrap 模板
  // <div class="loadingWrap">
  //   <div class="cover"></div>
  //   <div class="login">
  //     <img src="../../assets/loading.gif">
  //     <span>正在加载中...</span>
  //   </div>
  // </div>

  //显示正在加载
  function showLoading(options) {

    options = options || {};
    let left = options.left || 0;
    let top = options.top || 0;

    let loadingDom = '<div class="loadingWrap" id="loading">\
    <div class="cover" style="left: '+left+'px; top: '+top+'px;"></div>\
  <div class="login">\
    <img src="../assets/loading.gif">\
      <span>正在加载中...</span>\
    </div>\
   </div>';

   $('body').append(loadingDom);

  }

  // 隐藏正在加载
  function hideLoading() {
    $('#loading').remove();
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

  // ##### 职位详情
  // api: /api/jobs/detail
  // method: GET
  // 参数： id(Y)
  // 返回值：  message     status     data
  // JOB_DETAIL_API

  // 获取职位详情数据
  function getJobDetail(params, cb) {
    params = params || {};
    let id = params.id || 1;
    let job = params.job || '前端工程师';

    $.ajax({
      type: 'get',
      url: JOB_DETAIL_API,
      data: {id: id, job: job},
      success: function(data) {
        if (data.status == 0) {
          // 获取数据成功
          cb(data.data);
        }else {
          console.log('获取数据失败');
        }
      },
      error: function(err) {
        console.log('网络繁忙，请稍后再试');
      }
    });

  }

  // 进入页面首先获取职位详情
  let jobDetail = JSON.parse(sessionStorage.getItem('job-params'));
  getJobDetail(jobDetail, function(data) {

    let $wrap = $('.content .wrap');
    
    // 获取到了数据
    let dom = `
    <div class="jobWrap border-bottom">
    <h1>${data.job}</h1>
    <div class="collect">
      <span class="iconfont icon-shouye"></span>
      <span>${data.collect == 0 ? '未收藏' : '已收藏'}</span>
    </div>
  </div>
  <div class="jobBenefits border-bottom">
    <nav class="list clear oneline-ellipsis">
      <li class="list-item">
        <em class="iconfont icon-shouye home-action"></em>
        <span>${data.minSalary}k-${data.maxSalary}k</span>
      </li>
      <li class="list-item">
        <em class="iconfont icon-shouye home-action"></em>
        <span>${data.city}</span>
      </li>
      <li class="list-item">
        <em class="iconfont icon-shouye home-action"></em>
        <span>${data.time}</span>
      </li>
      <li class="list-item">
        <em class="iconfont icon-shouye home-action"></em>
        <span>${data.minExperience}-${data.maxExperience}年</span>
      </li>
      <li class="list-item">
        <em class="iconfont icon-shouye home-action"></em>
        <span>${data.education}</span>
      </li>
    </nav>
    <p>职位诱惑: ${data.temptation}</p>
  </div>
  <div class="company">
    <div class="left">
      <img src="${data.companyPic}">
    </div>
    <div class="center">
      <h3>${data.company}</h3>
      <p class="oneline-ellipsis">${data.companySize}</p>
    </div>
    <div class="right">
      <img src="${data.logo}">
    </div>
  </div>
  <div class="jobDescription">
    <h4>职位描述</h4>
    <p>${data.jobDescription}</p>
  </div>
  <div class="interviewWrap">
    <h4>面试评价</h4>
    <p>${data.interviewWrap}</p>
  </div>
    `;

    $wrap.append(dom);
    myScroll.refresh();
  });

  // 滚动视图内容
  var myScroll = new IScroll('.content', {
    click: true,
    tap: true,
  });

// ##### 投递简历
// api: /api/user/delive/resume
// method: GET
// 参数： id
// 返回值 ： message     status     data
// DELIVER_RESUME

  // 点击投递简历，首先判断是否登录
  // 未登录，则挑转到登录页面，
  // 登录了则跳转到投递成功的页面 deliver.html
  $('.footer .sendResume').click(function() {
    console.log('投递成功');
    if (!checkLogin()) {
      window.location.href = './login.html';
      return;
    }
    deliverResume(jobDetail, function() {
      window.location.href = './deliver.html';
    });
  });

  function deliverResume(jobDetail, cb) {
    $.ajax({
      type: 'get',
      url: DELIVER_RESUME,
      data: {id: jobDetail.id},
      success: function(data) {
        if (data.status == 0) {
          cb();
        }else {
          console.log('投递失败');
        }
      },
      error: function (err) {
        console.log('网络繁忙，请稍后再试');
      }
    });
    return flag;
  }


})();

