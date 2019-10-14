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
  window.location.href = './jobDetail.html';
});
