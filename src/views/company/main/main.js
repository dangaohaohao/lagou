
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

