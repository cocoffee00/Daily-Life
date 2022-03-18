// product_page.js

(function($){

  // 공통변수
  var productBox = $('#productBox');
  var jDate = JSON.parse(localStorage.getItem("slectJson"));

  // 기본 레이아웃 구현
   var test = '<div class="product_area"><div class="product_img"></div><div class="product_title"><div class="p_title"></div></div>';

   productBox.html(test);



   // json 값 제대로 가져오는지 테스트
  var tt = productBox.find('.p_title');
  tt.text(jDate.product_name);



})(jQuery);