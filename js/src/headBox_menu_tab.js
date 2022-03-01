// headBox_menu_tab.js

(function($){

// 전체메뉴, 브랜드, 기능별 아코디언 적용하기

//변수

const tabWrap = $('.tab_wrap');

const mkTabAccodian = ' <div class="head_tab_inner"><ul class="clearfix"><div class="tab_title"><li><button type="button"><div class="icon"></div><span>전체메뉴</span></button><div class="sub_list"></div></li></div><div class="tab_title"><li><button type="button"><span>브랜드</span></button><div class="sub_list"><a href="#">list_1_01</a><a href="#">list_1_02</a><a href="#">list_1_03</a><a href="#">list_1_04</a></div></li></div><div class="tab_title"><li><button type="button"><span>기능별</span></button><div class="sub_list"></div></li></div><li><a href="#"><span>베스트</span></a></li><li><a href="#"><span>선물세트</span></a></li>  <li><a href="#"><span>이벤트</span></a></li></ul></div>';
tabWrap.append(mkTabAccodian);

var tabTitle = tabWrap.find('.tab_title');
var tabSub = tabWrap.find('.sub_list');

tabTitle.on('mouseenter',function(e){
  e.preventDefault();
  $(this).find(tabSub).slideDown();
  // $(this).css({backgroundColor : 'red'});
})



})(jQuery);