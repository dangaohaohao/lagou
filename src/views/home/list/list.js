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