(function() {
  
// 首先 tabbar 是动态渲染上去的，后期可能会再进行添加

function initTabbar(data) {
  let $list = $('.tabbar .list');

  let tabbarTemplate = '<a href="{{href}}" class="list-item text-center {{active}}">\
<span class="iconfont {{icon}}"></span>\
<span>{{text}}</span>\
</a>';

  let tabbarItemTemplate = '';

  // 判断当前的路径
  let arr = window.location.href.split('/');
  let page = arr[arr.length-1].split('.');
  let currentPath = page[0];

for (let i = 0, len = data.length; i < len; i ++) {
  let item = data[i];
  let tabbarItemDom = tabbarTemplate.replace(/{{href}}/, item.href);
  tabbarItemDom = tabbarItemDom.replace(/{{icon}}/, item.icon);
  tabbarItemDom = tabbarItemDom.replace(/{{text}}/, item.text);
  tabbarItemDom = tabbarItemDom.replace(/{{active}}/, (currentPath == item.id ? 'active': ''));
  tabbarItemTemplate += tabbarItemDom;
}

$list.append(tabbarItemTemplate);

}


let tabbar = [{
    id: 'home',
    href: './home.html',
    icon: 'icon-shouye',
    text: '职位'
  },
  {
    id: 'search',
    href: './search.html',
    icon: 'icon-sousuo',
    text: '搜索'
  },
  {
    id: 'mime',
    href: './mime.html',
    icon: 'icon-wode',
    text: '我的'
  }
];


initTabbar(tabbar);

})();
