// headBox_menu_tab.js

(function($){

// 1.전체메뉴, 브랜드, 기능별 아코디언 적용하기
// 2. 아코디언 안에 들어갈 목록 json으로 뿌려주기?

//변수

const tabWrap = $('.tab_wrap');

const mkTabAccodian = ' <div class="head_tab_inner"><ul class="clearfix"><div class="tab_title"><li><button type="button"><div class="icon"></div><span>전체메뉴</span></button><div class="sub_list"><a href="#">test_01</a></div></li></div><div class="tab_title"><li><button type="button"><span>브랜드</span></button><div class="sub_list"><a href="#">list_1_01</a><a href="#">list_1_02</a><a href="#">list_1_03</a><a href="#">list_1_04</a></div></li></div><div class="tab_title"><li><button type="button"><span>기능별</span></button><div class="sub_list"><a href="#">test</a><a href="#">list_1_02</a></div></li></div><li><a href="#"><span>베스트</span></a></li><li><a href="#"><span>선물세트</span></a></li>  <li><a href="#"><span>이벤트</span></a></li></ul></div>';
tabWrap.append(mkTabAccodian);

var tabTitle = tabWrap.find('.tab_title');
var tabSub = tabWrap.find('.sub_list');


//이벤트

// 탭 마우스진입시 아코디언 작동
tabTitle.on('mouseenter',function(e){
  e.preventDefault();
  $(this).find(tabSub).stop().slideDown();
  $(this).parent().siblings('li').find(tabSub).stop().slideUp();
})
tabTitle.on('mouseleave',function(e){
  e.preventDefault();
 tabSub.stop().slideUp();
})


})(jQuery);