// saleBox_v1.js

(function($){

  $.ajax({url:'../data/product.json'}).done(function(data){
    
    var saleCate = [];
    var dataFile = data;
    var prodLen = dataFile.length;
    
    var i = 0;
    var permission = true;

  // for문으로 json data 내부의 세일이 공백이 아닌 값을 배열로 넣음

    for( ; i < prodLen ; i += 1){
      if ( dataFile[i].sale !== '' ){
      saleCate.push(dataFile[i]);
      }
    };//for
    
  // _____________________________________________________________________________
  // 불러온 json기반으로 레이아웃 구성하고 배치하기________________________________

      var saleBox = $('#saleBox');
    
    // #saleBox 안에 들어갈 주요 클래스 구역 만들기
    var saleBoxSet ='<div class="sale_area"><span class="blind"></span><div class="sale_title"><h2>세일 상품</h2></div><div class="product_list_btn"></div><div class="product_list a_set"></div><div class="product_more_btn"></div></div>';
    saleBox.html(saleBoxSet);
    
      var saleListBtn = saleBox.find('.product_list_btn'); // 추가 구성하기
      var prodList = saleBox.find('.product_list');
      var prodMoreBtn = saleBox.find('.product_more_btn'); // 추가 구성하기

  // 더보기 버튼 클릭시 페이지 이동(일단 에러페이지로 연결)____________________________

    var morebtnArea = '<span class="blind">추천상품 더보기</span><a href="./errorPage.html"><div class="more_btn_icon img_area"></div><span>더보기</span></a>';
    prodMoreBtn.html(morebtnArea);

    // 상품 리스트들이 들어갈 구역 만들기
      var saleConSet = '<div class="product_list_box"></div>';
      prodList.append(saleConSet);


   // 버튼 구성하기
   var btnDiv = '<div class="product_next_btn"><button type="button"><span class="blind">next</span></button></div><div class="product_prev_btn"><button type="button"><span class="blind">prev</span></button></div>';
   saleListBtn.append(btnDiv);
   
   var nextBtn = saleListBtn.find('.product_next_btn');
   var prevBtn = saleListBtn.find('.product_prev_btn');
   var j =0;
   

   // evt : next button 클릭시 슬라이드 이동
   nextBtn.on('click',function(e){
     e.preventDefault();
     if(permission){
       permission = false;

       j += 1;
       if( j >= 2){
         tabList.css({'marginLeft' : (100 * j) + '%'})
         j = 0;
       }
       tabList.stop().animate({'marginLeft' : (-100 * j) + '%'},function(){
         permission = true;
       })//tabList.stop().animate()
     }//if
   }); //nextBtn.on()
   
   // ent : 슬라이드 버튼 마우스 엔터시 css 적용
   nextBtn.on('mouseenter',function(e){
     e.preventDefault();
     nextBtn.find('button').css({ transform: 'scale('+1.2+')', backgroundColor : '#'+26323855 });
   });//nextBtn.on()
   nextBtn.on('mouseleave',function(e){
     e.preventDefault();
     nextBtn.find('button').removeAttr('style');
   });//nextBtn.on()


   // prev button 클릭시 슬라이드 이동
   prevBtn.on('click',function(e){
     e.preventDefault();
     if(permission){
       permission = false;

       j -= 1;
       tabList.stop().animate({'marginLeft' : (-100 * j) + '%'},function(){
         if( j < 0){
           j= 1;
           tabList.css({'marginLeft' : (-100 * j) + '%'})
         }
         permission = true;
       });//tabList.stop().animate()
     }//if
   }); //nextBtn.on()

   // ent : 슬라이드 버튼 마우스 엔터시 css 적용
   prevBtn.on('mouseenter',function(e){
     e.preventDefault();
     prevBtn.find('button').css({ transform: 'scale('+1.2+')', backgroundColor : '#'+26323855 });
   });//prevBtn.on()
   prevBtn.on('mouseleave',function(e){
     e.preventDefault();
     prevBtn.find('button').removeAttr('style');
   });//prevBtn.on()

    
   // 세일 상품 목록 리스트 구현 하기
   var prodListBox = prodList.find('.product_list_box');

    prodListBox.html('<ul class="clearfix tab_list"></ul>');

    var tabList = prodListBox.find('.tab_list');
    var saleCateLen = saleCate.length;


    // fn : 기본 상품 가격 노출(콤마추가)
     var addCommaFn = function(a){
      var tSet =  saleCate[a];
      var result = parseInt(tSet.price);
        return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }//addCommaFn()
    var addCommaSaleFn = function(a){
      var tSet =  saleCate[a];
      var result = parseInt(tSet.sale);
        return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }//addCommaSaleFn()

    // fn : 세일 상품 구현 파트
    var tabMenuSetFn = function(k){

      var listBoxSet = '<li><a href="#"><div class="a_inner"><div class="img_thumb img_area"></div><div class="list_contant"><div class="title_inner"><span><p class="brand"></p></span><span><p class="title"></p></span></div><div class="product_price"><em class="now_price"></em><p class="price"></p></div><div class="product_tag"></div></div></div></a></li>';

      var a = 0;
      var liIdx, tSet;
      var url ='../img/product/';

      for ( ; a < saleCateLen ; a+=1){
        tabList.append(listBoxSet);
        
        liIdx = tabList.find('li').eq(a);
        tSet = saleCate[a];
        
        liIdx.find('.brand').text(tSet.brand);
        liIdx.find('.title').text(tSet.product_name);
        liIdx.find('.now_price').text(addCommaFn(a) + '원');
        liIdx.find('.price').text(addCommaSaleFn(a) + '원');
        
        liIdx.find('.img_thumb').css({backgroundImage :'url('+ url+tSet.image+')'});
      }//for
    }; // tabMenuSetFn()
    
    tabMenuSetFn(0); // 첫 화면에서 보여줄 상품

    // 각 아이템 클릭시 상품 상세페이지로 이동+해당 상품 정보 가져가기 + 뒤로가기 문제 수정하기!
    var linkA = tabList.find('a');

    linkA.on('click',function(e){
      e.preventDefault();
    
      var i = $(this).parent().index();
      // 해당 데이터만 따로 다시 담기
      var slectJson = dataFile[i];
      console.log(slectJson);

      // localStorage.setItem('slectJson' , JSON.stringify(slectJson))
      window.location.replace('./product_page.html');
    });
    

  }); //$.ajax(data)
})(jQuery);