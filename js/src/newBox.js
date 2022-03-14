
// newBox.js

(function($){

  $.ajax({url : '../data/product.json'}).done(function(data){


    var newBox = $('#newBox');
    var newArea = newBox.children('.new_area');
    
    // new 상품 정보 표기할 박스 구현
    // var newTitleBox = '<div class="new_title_area"><div class="new_title_inner"><h2>신상품</h2><div class="new_title_part"><div class="new_detail_btn"></div></div></div></div>'
    // newArea.html(newTitleBox);

    





  }) // $.ajax
})(jQuery);