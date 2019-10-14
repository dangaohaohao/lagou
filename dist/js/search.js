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

// 获取本地 data 中的 json 数据
function getCities() {
  $.ajax({
    type: 'get',
    url: '../../data/cities.json',
    success: function (data) {
      let cityDom = createCityList(data);
      $('.content .cityList').html(cityDom);
    },
    error: function (err) {
      console.log('获取城市列表出错');
    }
  });
}

// 动态渲染cityLists
function createCityList(data) {
  let cityDom = '';
  for (let i = 0, len = data.length; i < len; i++) {
    cityDom += `${createDl(data[i])}`;
  }
  return cityDom;
}

// 创建每个 dl
function createDl(data) {
  let dlDom = '';
  let ddDom = '';
  for (let i = 0, len = data.cityList.length; i < len; i++) {
    ddDom += `<dd>${data.cityList[i]}</dd>`;
  }
  dlDom += `<dl class="citylist-item clear">
  <dt>${data.nameStr}</dt>${ddDom}</dl>`;
  return dlDom;
}

// 判断缓存中是否有 city false 为无， true 为有
function hasCity() {
  return localStorage.getItem('city') == null ? 'false' : 'true';
}


// 动态渲染城市数据
getCities();






(function () {

  // 当我们点击搜索图标或者按下按键的时候，获取参数,发送请求
  // 输入的值还需要存入 localStorage 中，当点击删除的时候需要删除
  // searchKey: []
  $('.search').click(function () {
    let val = $('.searchIpt').val();
    if (!val) {
      return;
    }
    searchByKey(val);
    addKey(val);
    $('.searchList').html('');
  });
  $(document).keydown(function (e) {
    // 如果按键码为 13，发送请求
    if (e.keyCode == 13) {
      let val = $('.searchIpt').val();
      if (!val) {
        return;
      }
      searchByKey(val);
      addKey(val);
      $('.searchList').html('');
    }
  });
  // 监听按键值的变化
  $(document).keyup(function () {
    let val = $('.searchIpt').val();
    if (!val) {
      $('.list').html('');
      let searchDom = createSearchDom();
      $('.searchList').html(searchDom);
      scroll.refresh();
    }
  });

  // 当点击搜索关键字的删除时:
  // 移除这个搜索关键字
  // 重新渲染 刷新野蛮
  $('.searchList').on('click', '.delete-search', function () {
    let key = $(this).parent().children('.ketText').text();
    removeKey(key);
    let searchDom = createSearchDom();
    $('.searchList').html(searchDom);
    scroll.refresh();
  });


  // 发送 ajax 请求，动态渲染数据
  function searchByKey(key) {
    $.ajax({
      type: 'get',
      url: SEARCH_BY_KEY,
      data: {
        keyword: key
      },
      success: function (data) {
        if (data.status == 0) {
          // 数据请求成功
          let itemDom = createListDom(data.data);
          $('.wrap .list').html(itemDom);
          scroll.refresh();
        } else {
          console.log('数据请求失败');
        }
      },
      error: function (err) {
        console.log('网络繁忙，数据请求失败');
      }
    });
  }

  // 创建 dom 
  function createListDom(data) {
    let itemDom = '';
    for (let i = 0, len = data.length; i < len; i++) {
      let item = data[i];
      itemDom += '  <li class="list-item border-bottom" data-id="' + item.id + '" data-job="' + item.job + '">\
      <div class="left">\
        <img src="' + item.companyPic + '">\
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
  let scroll = new IScroll('.content', {
    tap: true,
    click: true,
  });

  // 进入页面的时候，首先让 cityList 隐藏，获取缓存中选中的 city，否则默认为全国，city: value
  // 当我们点击城市的时候要显示城市列表，获取缓存中选中的 city先清空 dd 的样式，添加 selected 样式,
  // 其他的(searchWrap | list | searchList)隐藏，
  // 显示城市列表并且显示返回按钮
  // 当点击 dd 时，隐藏返回按钮，隐藏城市列表，其他的显示，dd 添加点击样式
  // 初始化 函数
  init();

  function init() {
    $('.back').css('display', 'none');
    $('.cityList').css('display', 'none');
    let $cityIcon = $('.cityOption .selectedCity');
    if (hasCity() == 'true') {
      let city = localStorage.getItem('city');
      $cityIcon.text(city);
    }
    $cityIcon.click(function () {
      $('.cityList').css('display', 'block');
      $('.searchWrap').css('display', 'none');
      $('.list').css('display', 'none');
      $('.searchList').css('display', 'none');
      $('.cityList dd').removeClass('active');
      $('.back').css('display', 'block');
      scroll.refresh();
    });

    // 给 cityList 下的 dd 添加点击事件
    $('.cityList').on('click', 'dd', function () {
      $('.cityList dd').removeClass('selected');
      $(this).addClass('selected', 'active');
      localStorage.setItem('city', $(this).text());
      $('.cityList').css('display', 'none');
      $('.searchWrap').css('display', 'block');
      $('.list').css('display', 'block');
      $('.searchList').css('display', 'block');
      $('.back').css('display', 'none');
      window.location.href = './search.html';
      scroll.refresh();
    });
  }

  $('.back').click(function() {
    window.location.href = './search.html';
  });

})();


  // 判断缓存中是否有
  function hasSearchKey() {
    return localStorage.getItem('searchKey') == null ? 'false' : 'true';
  }

  // 存入缓存中
  function addKey(key) {
    if (hasSearchKey() == 'true') {
      // 有这个 key, 需要先取出来再存进去
      let arr = JSON.parse(localStorage.getItem('searchKey'));
      // 如果缓存中存在就不存了
      if (arr.includes(key)) {
        return;
      }
      arr.push(key);
      localStorage.setItem('searchKey', JSON.stringify(arr));
    }else {
      // 没有这个 key，直接存进去
      console.log(key);
      let arr = [];
      arr.push(key);
      localStorage.setItem('searchKey', JSON.stringify(arr));
    }
  }

  // 删除某个 key
  function removeKey(key) {
    // 既然可以点删除说明是存在的
    let index ;
    let arr = JSON.parse(localStorage.getItem('searchKey'));
    for(let i = 0, len = arr.length; i < len; i ++) {
      if (arr[i] == key) {
        index = i;
      }
    }
    arr.splice(index, 1);
    localStorage.setItem('searchKey', JSON.stringify(arr));
  }

  // 创建 dom
  function createSearchDom() {
    if (hasSearchKey() == 'false') {
      return;
    }
    let arr = JSON.parse(localStorage.getItem('searchKey'));
    let searchDom = '';
    for(let i = 0, len = arr.length; i < len; i ++) {
      searchDom += `<li class="search-item text-center">
      <span class="oneline-ellipsis ketText">${arr[i]}</span>
      <span  class="iconfont icon-fanhui delete-search"></span>
    </li>`;
    }
    return searchDom;
  }
  




// 点击每个 list-item 跳转到职位详情页

$('.content .list').on('click', '.list-item', function() {
  let id = $(this).attr('data-id');
  let job = $(this).attr('data-job');

  sessionStorage.setItem('job-params', JSON.stringify({
    id,
    job
  }));
  window.location.href = './jobDetail.html';
});
