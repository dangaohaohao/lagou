
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
