
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

