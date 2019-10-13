(function () {

  //   ##### 已经面试职位列表   ##### 将要面试的职位列表
  // api: /api/user/resume_list
  // method: GET
  // 参数： type(Y   0:已经面试, 1: 将要面试)
  // 返回值 ： message     status     data
  // INTERVIEW_LIST

  function getInterviewList(type, cb) {
    $.ajax({
      type: 'get',
      url: INTERVIEW_LIST,
      data: {
        type: type
      },
      success: function (data) {
        if (data.status == 0) {
          cb(data);
        } else {
          console.log('请求面试数据失败');
        }
      },
      error: function (err) {
        console.log('网络繁忙，请求失败');
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

  let interviewScroll = new IScroll('.content', {
    click: true,
    tap: true
  });

  let $list = $('.content .list');
  let $interviewCategory = $('.interviewCategory');
  let $interviewed = $('.interviewed');
  let $interviewing = $('.interviewing');

  // 当点击 interviewCategory 下的 li 时，
  // 给当前元素添加 selected 样式，兄弟元素移除该样式
  $interviewCategory.on('click', 'li', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
  });

  // 点击已面试，获取已面试列表
  $interviewed.click(function () {
    getInterviewList(0, function (data) {
      let interviewedDom = createListDom(data.data);
      $list.html(interviewedDom);
      interviewScroll.refresh();
    });
  });

  // 点击未面试，获取未面试列表
  $interviewing.click(function () {
    getInterviewList(1, function (data) {
      let interviewingDom = createListDom(data.data);
      $list.html(interviewingDom);
      interviewScroll.refresh();
    });
  });

  // 首先渲染已面试的列表
  getInterviewList(0, function (data) {
    let interviewedDom = createListDom(data.data);
    $list.html(interviewedDom);
    interviewScroll.refresh();
  });

  // 给每个 list-item 添加点击事件
   $list.on('click', '.list-item', function() {

    let id = $(this).attr('data-id');
    let job = $(this).attr('data-job');
  
    sessionStorage.setItem('job-params', JSON.stringify({
      id,
      job
    }));
    window.location.href = './jobDetail.html';
  });


})();