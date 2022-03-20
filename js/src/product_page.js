// product_page.js

(function($){

  // 공통변수
  var productBox = $('#productBox');
  var jDate = JSON.parse(localStorage.getItem("slectJson"));
  // var sData = JSON.parse(localStorage.getItem("saleJson"));
  var url = "../img/product/";
  var i;

  // 기본 레이아웃 구현
   var containerSet = '<div class="product_area"><div class="product_img"></div><div class="product_title_area"></div></div>';
   productBox.html(containerSet);

   var productArea = productBox.children('.product_area');
   var productImg = productArea.find('.product_img');
   var productTitleArea = productArea.find('.product_title_area');

   // 상품 이미지 파트
   var productImgSet = '<div class="p_main_img img_area"></div><div class="p_tumbnail_area"><ul class="clearfix"></ul></div>';
   productImg.html(productImgSet);

   // 상품 구매 파트
   var productTitleAreaSet = '<div class="title_wrap brand_part"></div><div class="title_wrap price_part"></div><div class="title_wrap service_part"></div><div class="title_wrap btn_part"></div>';
   productTitleArea.html(productTitleAreaSet);

  // 상품 구매 파트 세부 디테일 레이아웃 구현
   var brandPart = productTitleArea.find('.brand_part');
   var pricePart = productTitleArea.find('.price_part');
   var servicePart = productTitleArea.find('.service_part');
   var btnPart = productTitleArea.find('.btn_part');

   var brandPartSet = '<div class="brand_area"><span class="brand_name"></span><button type="button">브랜드 더보기</button></div><div class="product_title"></div><div class="product_sub_title"></div>';

   var pricePartSet = '<div class="title_wrap_inner"><dl><dt>판매가</dt><dd></dd></dl><dl class="sale_ck"><dt>할인가</dt><dd></dd></dl><dl><dt>배송비</dt><dd class="shipping_fee on">2,500원 (30,000 원 이상 구매시 무료) <br />(도서산간지역 3,000원, 제주지역 3,000원 추가)</dd></dl></div>';

   var servicePartSet = '<div class="title_wrap_inner"><div class="satisfaction"><span>고객만족도</span><div class="satisfaction_ck"><i class="fa-solid fa-star"></i></div></div><div class="quantity"><span>구매수량</span><div class="quantity_ck"><button type="button" class="plus_btn" ><p class="blind">더하기</p><i class="fa-solid fa-plus"></i></button><button type="button" class="minus_btn"><p class="blind">빼기</p><i class="fa-solid fa-minus" disabled></i></button><input type="text" name="quantity_num" id="quantity_num" value="1"><span class="input_count"></span></div></div></div>';


   var btnPartSet = '<div class="title_wrap_inner"><dl class="total_price"><dt>총 상품 금액</dt><dd><p class="count">(<em>1</em>)개</p></dd></dl><div class="product_btns"><div class="interested_items"><button type="button" class="h_btn"><i class="fa-solid fa-heart"></i></button></div><div class="cart_btn"><button type="button">장바구니</button></div><div class="buy_btn"><button type="button">구매하기</button></div></div></div>';

   brandPart.html(brandPartSet);
   pricePart.html(pricePartSet);
   servicePart.html(servicePartSet);
   btnPart.html(btnPartSet);

  //=========================================================================

  // 상품 이미지 파트 구현
  var pMainImg = productImg.children('.p_main_img');
  var pTumbImg = productImg.children('.p_tumbnail_area');
  var imgAreaUl = pTumbImg.find('ul');

  var thumbCount = jDate.thumb_count;

  var thumbnailSet = '<li class="p_tumbnail img_area_thumb"><button type="button"></button></li>';
  
  // fn : 상품 썸네일마다 이미지 적용 
  var thumbSetFn = function(n){
    imgAreaUl.append(thumbnailSet);
    
    var thumbArr = jDate.thumb_imgs[n];
    var thumbLiN = imgAreaUl.find('li').eq(n);

    thumbLiN.css({ backgroundImage : 'url('+url+thumbArr+')' })
  };//thumbSetFn()
  
  for( i=0 ; i < thumbCount ; i+=1 ){
    thumbSetFn(i)
  };

  // fn : 상품 메인 이미지 구현
  var mainImgFn = function(a){
    var dataA = jDate.thumb_imgs[a];
    pMainImg.css({ backgroundImage : 'url('+url+dataA+')' })
  };//mainImgFn()

    // 화면에 보여줄 메인 상품 이미지
    mainImgFn(0);

  // evt : 썸네일 버튼 클릭시 메인 이미지 구역에 이미지 출력
  var thumbBtn = imgAreaUl.find('button');

  thumbBtn.on('click',function(e){
    e.preventDefault();
    var now = $(this).parent().index();
    mainImgFn(now);
  });//thumbBtn.on()


   //브랜드,상품이름,요약 ========================================
   var brandName = brandPart.find('.brand_name');
   var productTitle = brandPart.find('.product_title');
   var productSubTitle = brandPart.find('.product_sub_title');

   brandName.text(jDate.brand);
   productTitle.text(jDate.product_name);
   productSubTitle.text(jDate.summary);

  //  ============================================================
  // 기본 상품 가격 노출(콤마추가)
  var addComma = function(){
    var result = parseInt(jDate.price);
      return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  var addCommaSale = function(){
    var result = parseInt(jDate.sale);
      return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

   //판매가,할인가,배송 =============================================
   var price = pricePart.find('dl').eq(0).children('dd');
   var saleCkAll = pricePart.find('.sale_ck');
   var saleCk = pricePart.find('dl').eq(1).children('dd');
   
   //할인 여부에 따라 할인가 보여주기
   if(jDate.sale === ''){
    price.text(addComma() + '원');
    saleCkAll.hide();
   }else if(jDate.sale !== ''){
    price.text(addComma() + '원');
    price.css({ textDecoration: 'line-through' });
    saleCk.text(addCommaSale() + '원');
   }

   //고객 만족도,구매수량==============================================

   var satisfactionCk = servicePart.find('.satisfaction_ck')
   var satisfaction = servicePart.find('.quantity')
   var StarSet = '<i class="fa-solid fa-star"></i>';
   var plusBtn = satisfaction.find('.plus_btn');
   var minusBtn = satisfaction.find('.minus_btn');

   //만족도 값에 따라 별 추가
    if ( jDate.satisfaction >= '80'){
      for( i=0 ; i <4 ; i+=1){
        satisfactionCk.append(StarSet);
      };
    } else if ( jDate.satisfaction >= '60'){
      for( i=0 ; i <3 ; i+=1){
        satisfactionCk.append(StarSet);
      };
    }else if (  jDate.satisfaction >= '40'){
      for( i=0 ; i <2 ; i+=1){
        satisfactionCk.append(StarSet);
      };
    }else if (  jDate.satisfaction >= '20'){
      for( i=0 ; i <1 ; i+=1){
        satisfactionCk.append(StarSet);
      };
    };

    //구매/장바구니/찜하기 버튼 =========================================
    var interestedItems = btnPart.find('.interested_items');
    var heartIconBtn = interestedItems.find('button');
    var heartIcon = heartIconBtn.find('.fa-heart');
    var totalPrice = btnPart.find('.total_price').children('dd');
    var totalCountP = totalPrice.find('p');
    var totalCountEm = totalCountP.find('em');
   

    // 기본 가격 노출
      totalPrice.text(addComma() + '원');

    // 수량 버튼 클릭시 총 상품 가격 변경 이벤트
      var count = 1;
      var stock = parseInt(jDate.stock);
      var originPrice = parseInt(jDate.price);



      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      // 추가해야할것 : 
      // 1- 할인이 책정된 상품 총 상품 금액 처리 하기 


      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  
    // 변수
    // + 버튼 클릭시 수량과 가격을 플러스 하는 변수 ==========================
    var plusCountFn =function(){
      var countString = count;
        var addComma = function(){
          var result = parseInt(jDate.price) * count;
          return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        totalPrice.text( addComma() + '원'); 
        totalCountEm.text(countString);
        $('input[type=text][name=quantity_num]').val(countString);
    }//plusCountFn()

    // 할인가격시 적용되는 변수==================================수정중
    var salePlusCountFn =function(){
      var countString = count;
        var addComma = function(){
          var result = parseInt(jDate.sale) * count;
          return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        totalPrice.text( addComma() + '원'); 
        totalCountEm.text(countString);
        $('input[type=text][name=quantity_num]').val(countString);
    }
    
    // - 버튼 클릭시 수량과 가격을 마이너스 하는 변수
    var minusCountFn =function(){
      var countString = count;
        var addComma = function(){
          var result = originPrice * count;
          return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        totalPrice.text( addComma() + '원' );
        $('input[type=text][name=quantity_num]').val(countString);
    }; // minusCountFn()




    // 이벤트
    // ===================================================================
    // + 버튼 클릭 이벤트 : 수량에 도달하면 +버튼 비활성화
    plusBtn.on('click',function(e){
      e.preventDefault();
      ++count;

      minusBtn.attr("disabled", false)
      if(count <= stock ){
        plusCountFn();
      }else if (count = stock){
        plusBtn.attr("disabled", true)
      }
    });//plusBtn.on()

  
    // - 버튼 클릭 이벤트 : 수량이 1에 도달하면 - 버튼 비활성화
    minusBtn.on('click',function(e){
      e.preventDefault();
      count--;

      plusBtn.attr("disabled", false)
      if ( 0 < count  ) {
        minusCountFn();
      }else if ( count = 1){
        minusBtn.attr("disabled", true)
      }
    });//minusBtn.on()


    // 하트 아이콘 클릭시 컬러 변경 
    heartIconBtn.on('click',function(e){
      e.preventDefault();

      if(heartIconBtn.hasClass('on')){
        heartIconBtn.removeClass('on')
        heartIcon.removeAttr('style');
      }else{
        heartIconBtn.addClass('on')
        heartIcon.css({color: '#D50000', transform:  'scale(1.5)'})
       }
      });//heartIconBtn.on()


})(jQuery);