

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
