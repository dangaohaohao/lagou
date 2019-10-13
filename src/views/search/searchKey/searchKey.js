

  // 判断缓存中是否有
  function hasSearchKey() {
    return localStorage.getItem('searchKey') == null ? 'false' : 'true';
  }

  // 存入缓存中
  function addKey(key) {
    if (hasSearchKey() == 'true') {
      // 有这个 key, 需要先取出来再存进去
      let arr = JSON.parse(localStorage.getItem('searchKey'));
      // 如果缓存中存在就不存了
      if (arr.includes(key)) {
        return;
      }
      arr.push(key);
      localStorage.setItem('searchKey', JSON.stringify(arr));
    }else {
      // 没有这个 key，直接存进去
      console.log(key);
      let arr = [];
      arr.push(key);
      localStorage.setItem('searchKey', JSON.stringify(arr));
    }
  }

  // 删除某个 key
  function removeKey(key) {
    // 既然可以点删除说明是存在的
    let index ;
    let arr = JSON.parse(localStorage.getItem('searchKey'));
    for(let i = 0, len = arr.length; i < len; i ++) {
      if (arr[i] == key) {
        index = i;
      }
    }
    arr.splice(index, 1);
    localStorage.setItem('searchKey', JSON.stringify(arr));
  }

  // 创建 dom
  function createSearchDom() {
    if (hasSearchKey() == 'false') {
      return;
    }
    let arr = JSON.parse(localStorage.getItem('searchKey'));
    let searchDom = '';
    for(let i = 0, len = arr.length; i < len; i ++) {
      searchDom += `<li class="search-item text-center">
      <span class="oneline-ellipsis ketText">${arr[i]}</span>
      <span  class="iconfont icon-fanhui delete-search"></span>
    </li>`;
    }
    return searchDom;
  }
  


