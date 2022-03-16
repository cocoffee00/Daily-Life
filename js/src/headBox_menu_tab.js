// headBox_menu_tab.js

(function($){

// 1.전체메뉴, 브랜드, 기능별 아코디언 적용하기
// 2. 아코디언 탭과 안에 들어갈 목록 json으로 뿌려주기 <- 준비중
// 3. 아코디언 키보드 이벤트 추가하기.

//공통변수

var jsonData = $.getJSON('../data/product.json');
jsonData.done(function(data){

var brandArr = [];
var funcArr = [];
var productData = data;
var dataLen = productData.length;
var tabWrap = $('.tab_wrap');
var i;

// brandArr안에 json data 내부의 브랜드 값을 배열로 넣음
for(i=0; i<dataLen;i+=1){
  brandArr.push(productData[i].brand);
};

// brandArr안에 json data 내부의 기능별 값을 배열로 넣음
for(i=0 ; i<dataLen ; i+=1){
  if( productData[i].classification !== ''){
  funcArr.push(productData[i].classification);
  };
};

// 중복되는 브랜드를 정리
var brandNameCk = brandArr.filter(function(data,idx){
  return brandArr.indexOf(data) === idx;
});
// 중복되는 기능을 정리
var funcNameCk = funcArr.filter(function(data,idx){
  return funcArr.indexOf(data) === idx;
});


var tabAccodianSet = '<div class="head_tab_inner"><ul class="clearfix"></ul></div>';
tabWrap.html(tabAccodianSet);
var tabUl = tabWrap.find('ul');

var fullMenuSet = '<li><div class="tab_title aill"><button type="button"><span>전체메뉴</span></button><div class="sub_list"><a href="#">test_01</a></div></div></li>'
tabUl.append(fullMenuSet);

var brandSet ='<li><div class="tab_title brand"><button type="button"><span>브랜드</span></button><div class="sub_list"><div class="wrap_li"></div></div></div></li>'
tabUl.append(brandSet);

var functionSet = '<li><div class="tab_title func"><button type="button"><span>기능별</span></button><div class="sub_list"><div class="wrap_li"></div></div></div></li>'
tabUl.append(functionSet);

var etcSet = '<li><a href="#"><span>베스트</span></a></li><li><a href="#"><span>선물세트</span></a></li><li><a href="./event_page.html"><span>이벤트</span></a></li>';
tabUl.append(etcSet);

// 카테고리별 변수
var tabTitle = tabUl.find('.tab_title');
var tabSub = tabWrap.find('.sub_list');
var aLinkSet = '<a href="#"></a>';

var brandTabTitle = tabUl.find('.brand');
var funcTabTitle = tabUl.find('.func');
var tabSubA;
var brandSubLi
var wrapLi;

  // 브랜드 리스트 데이터 뿌려주기
  for( i=0 ; i < brandNameCk.length ; i+=1){
    wrapLi = brandTabTitle.find('.wrap_li');
    brandSubLi = brandTabTitle.find('.sub_list');
    wrapLi.append(aLinkSet);

    tabSubA = brandSubLi.find('a');
    tabSubA.eq(i).text(brandNameCk[i]);
  }

  // 기능별 리스트 데이터 뿌려주기
  for ( i=0; i<funcNameCk.length; i+=1){
    wrapLi = funcTabTitle.find('.wrap_li');
    brandSubLi = funcTabTitle.find('.sub_list');
    wrapLi.append(aLinkSet);

    tabSubA = brandSubLi.find('a');
    tabSubA.eq(i).text(funcNameCk[i]);
  }



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



}) //jsonData.done()

})(jQuery);