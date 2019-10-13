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


})();