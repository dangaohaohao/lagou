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





