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


function Scroll(dom, options){
  options = options || {};
  options.probeType = 3;
  // 控制下拉刷新的条件
  options.canrefresh = false;
  options.canloadmore = false;

  var myScroll = new IScroll(dom, options);
  
  myScroll.scrollTo(0, -50, 0);
  
  
  
  var refreshImg = document.querySelector('.refresh img');
  var refreshText = document.querySelector('.refresh span');
  var loadmoreImg = document.querySelector('.loadmore img');
  var loadmoreText = document.querySelector('.loadmore span');

  let loadingPath = '../assets/loading.gif';
  let arrowPath = '../assets/arrow.jpg';


  // 提供刷新dom的方法
  myScroll.on('beforeScrollStart', function(){
    // 识别当前可以滚动的最新高度
    myScroll.refresh();
  })
  
  
  // 监听正在滚动，处理下拉刷新
  myScroll.on('scroll', function(){
    if(myScroll.y >= 0){
      //达到了可以下拉刷新的条件
      refreshImg && (refreshImg.className = 'active');
      refreshText && (refreshText.innerText = '释放立即刷新...');
    }else{
      //没有达到条件
      refreshImg && (refreshImg.className = '');
      refreshText && (refreshText.innerText = '下拉可以刷新...');
    }
  })
  
  // 监听滚动停止的事件，处理下拉刷新
  myScroll.on('scrollEnd', function(){
    if(myScroll.y >= 0){
      //达到了可以下拉刷新的条件，触发下拉刷新
      refreshImg && (refreshImg.src = loadingPath);
      refreshText && (refreshText.innerText = '正在刷新...');
      //告诉外部下拉刷新触发了。让外部执行相关操作
      (options.canrefresh && options.refreshData) && options.refreshData(function(){
        // 刷新
        myScroll.refresh();
        //停止下拉刷新的方法
        refreshImg && (refreshImg.src = arrowPath);
        refreshImg && (refreshText.innerText = '下拉可以刷新...');
        myScroll.scrollTo(0, -50, 300);
      });
      
    }
    else if(myScroll.y > -50 && myScroll.y < 0){
      //可以看见部分下拉可以刷新的dom，收回下拉可以刷新的dom
      myScroll.scrollTo(0, -50, 300);
    }
    else{//myScroll.y < -50 ,正常滚动
  
    }
  })

  // 控制是否可以下拉刷新
  this.setCanRefresh = function(bool) {
    options.canrefresh = bool;
  }


  // 监听正在滚动，处理上拉加载更多
  myScroll.on('scroll', function(){
    var maxY = myScroll.maxScrollY;
    var y = myScroll.y;
    if(maxY >= y){
      //触发了
      loadmoreImg && (loadmoreImg.className = 'active');
      loadmoreText && (loadmoreText.innerText = '释放立即加载更多...');
    }
    else{
      //没有触发
      loadmoreImg && (loadmoreImg.className = '');
      loadmoreText && (loadmoreText.innerText = '上拉可以加载更多...');
    }
  })

  // 监听滚动停止的事件，处理上拉加载更多
  myScroll.on('scrollEnd', function(){
    var maxY = myScroll.maxScrollY;
    var minY = maxY + 50;
    var y = myScroll.y;
    // console.log('maxY:', maxY, 'y:', y);
    if(y >= minY){
      //正常滚动
    }
    else if(y < minY && y > maxY){
      //可以看见部分上拉可以加载更多的dom结构，收回
      myScroll.scrollTo(0, minY, 300);
    }
    else if(y <= maxY){
      //可以看见全部上拉可以加载更多的dom结构，触发上拉加载更多
      loadmoreImg && (loadmoreImg.src = loadingPath);
      loadmoreText && (loadmoreText.innerText = '正在加载中...');
      // 告诉外部触发了加载更多
      (options.canloadmore && options.loadmoreData) && options.loadmoreData(function(){
        // 刷新
        myScroll.refresh();
        loadmoreImg && (loadmoreImg.src = arrowPath);
        loadmoreText && (loadmoreText.innerText = '上拉可以加载更多...');
      });
    }
  })

  // 控制是否可以上拉加载更多的方法
  this.setCanLoadmore = function(bool) {
    options.canloadmore = bool;
  }



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

  let $list = $('.content .list');

  // 请求数据
  function requestData(params, callback) {
    $.ajax({
      type: 'get',
      url: HOME_JOBS_API,
      data: params,
      success: function (obj) {
        if (obj.status == 0) {
          // 请求成功，可以操作数据了
          let dom = createListDom(obj.data);
          callback(dom);
        } else {
          console.log('请求失败');
        }
      },
      error: function (err) {
        console.log('网络繁忙，请稍后再试');
      }
    });
  }

  // 创建 dom 
  function createListDom(data) {
    let itemDom = '';
    for (let i = 0, len = data.length; i < len; i++) {
      let item = data[i];
      itemDom += '  <li class="list-item border-bottom" data-id="'+item.id+'" data-job="'+item.job+'">\
      <div class="left">\
        <img src="'+ item.companyPic +'">\
      </div>\
      <div class="center">\
        <h3 class="title">' + item.company + '</h3>\
        <p class="info">' + item.job + '</p>\
        <p class="time">' + item.publish + '</p>\
      </div>\
      <div class="right text-center">' + item.minSalary + 'k-' + item.maxSalary + 'k</div>\
    </li>';
    }
    return itemDom;
  }

  // 创建 scroll 滚动视图
  let scroll = new Scroll('.content', {
    tap: true,
    click: true,
    refreshData: function(endRefresh) {
      params.page = 1;
      scroll.setCanRefresh(false);
      requestData(params, function(dom) {
        $list.html(dom);
        endRefresh();
        scroll.setCanRefresh(true);
      });
    },
    loadmoreData: function(endLoadMore) {
      params.page ++;
      scroll.setCanLoadmore(false);
      requestData(params, function(dom) {
        $list.append(dom);
        endLoadMore();
        scroll.setCanLoadmore(true);
      });
    }
  });


  // 请求参数
  let params = {
    page: 1,
    count: 10
  }

  showLoading({left: 0, top: 178});

  // 首先要渲染首屏数据
  requestData(params, function (dom) {
    $list.html(dom);
    hideLoading();

    scroll.setCanRefresh(true);
    scroll.setCanLoadmore(true);

    // 给每一个 item 添加点击事件
    $list.on('click', '.list-item', function() {

      // 每个 list-item 点击跳转到工作详情页面
      // 跳转方式: 
      // 1: 缓存请求回来的数据，保存点击工作的 index，
      // 工作详情页面根据 index 查找，动态渲染
      // 2: 拿到数据的 id, 缓存 id 和 标题，根据 id和标题来进行查找，
      // 发送请求，动态渲染页面
      // let index = $(this).index();
      // window.location.href = './jobDetail.html?id=3&job=产品经理;

      let id = $(this).attr('data-id');
      let job = $(this).attr('data-job');
    
      sessionStorage.setItem('job-params', JSON.stringify({
        id,
        job
      }));
      window.location.href = './jobDetail.html';
    });

  });



})();

(function() {

  // info 模板
  // 没有登录
  // <span>10秒钟定制职位</span>
  // <span class="text-center btn">去登录</span>
  // 登录了
  //<span>10秒钟定制职位</span> / <span>前端工程师/深圳南山/</span>
  // <span class="text-center btn">编辑</span>

  // 登录和不登录的状态是不一样的，根据本地缓存 isLogin 判断
  // 信息是通过缓存中的 select 来判断

  let $filter = $('.filter');

  if (checkLogin()) {
    // 用户登录了
    let select = localStorage.getItem('select');
    let info = '10秒钟定制职位';

    if (select) {
      info = '';
      for (let key in select) {
        info += select[key] + '/';
      }
      info = info.substring(0, info.length - 1);
    }

    let children = '<span>'+info+'</span>\
    <span class="text-center btn">编辑</span>';

    $filter.append(children);
    $filter.on('tap', '.btn', function() {
      console.log('去编辑');
    }); 
    
  }else {
    // 用户没登录
    let children = '<span>10秒钟定制职位</span>\
    <span class="text-center btn">去登录</span>';

    $filter.append(children);
    $filter.on('tap', '.btn', function() {
      console.log('去登录');
    }); 

  }





})();

