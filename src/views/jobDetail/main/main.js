
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

  // 点击公司进入公司页面
  $('.wrap').on('click', '.company', function() {
     // 把 公司 id 写到缓存中
     localStorage.setItem('companyId', jobDetail.id);
     window.location.href = './company.html';
  });


})();

