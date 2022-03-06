// headBox.js

(function($){

//수정중


  var jsonData;

  var headBox = $('#headBox');
  var headArea = headBox.children('.head_area');
  var navBox = headBox.find('#navBox');
  var unb = navBox.find('.unb');
  var navSearch = navBox.find('.nav_search');
  var navSearchUl = navSearch.find('ul');

  //로고 파트 
  var setHeadLogo = '<h1 id="logo"><a href="../../index.html" title="daily life"><span class="blind">daily life</span></a></h1>';
  //사용자설정 네비게이션 파트
  var setUserNavi = '<nav id="navBox"><h2 class="blind">page navigation</h2><div class="unb"><h3 class="blind">사용자 설정 네비게이션</h3></div><div class="nav_search"><h3 class="blind">검색 및 사용자 편의 네비게이션</h3><ul class="clearfix"></ul></div></nav>';

  var setNavSearch = '<h2 class="blind">검색 및 사용자 편의 네비게이션</h2>';

  console.log('???',headArea.html());

  headArea.append(setHeadLogo);
  headArea.append(setUserNavi);
  navSearch.append(setNavSearch);

  headBox.append('<script src="../js/src/headBox_modal.js"></script>',);






})(jQuery);