(function($){




  //====================================세일 아이템만 불러오도록 수정하기!!!!!

  $.ajax({url:'../data/product.json'}).done(function(data){
    
    var saleCate = [];
    var dataFile = data;
    var prodLen = dataFile.length;
    var saleCateLen = saleCate.length;
    var i = 0;
    var permission = true;

  // for문으로 json data 내부의 세일이 공백이 아닌 값을 배열로 넣음

    for( ; i < prodLen ; i += 1){
      if ( dataFile[i].sale !== '' ){
      saleCate.push(dataFile[i]);
      }
    }; 
    console.log(saleCate);
    
   



// _____________________________________________________________________________
// 불러온 json기반으로 레이아웃 구성하고 배치하기________________________________

      var saleBox = $('#saleBox');
      var saleArea = saleBox.children('.sale_area');
    
    // #saleBox 안에 들어갈 주요 클래스 구역 만들기
    var saleBoxSet ='<div class="sale_area"><span class="blind"><h2>세일 상품</h2></span><div class="sale_title"><h2>세일 상품</h2></div><div class="product_list_btn"></div><div class="product_list a_set"></div><div class="product_more_btn"></div></div>';
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


    // 상품 리스트 내용 구성하기__________________________________________________
    var prodListBox = prodList.find('.product_list_box');


    //++++++++++++ 이전,다음 버튼 + 슬라이드 작성하기
   // 버튼 구성하기

   var btnDiv = '<div class="product_next_btn"><button type="button"><span class="blind">next</span></button></div><div class="product_prev_btn"><button type="button"><span class="blind">prev</span></button></div>';
   saleListBtn.append(btnDiv);
   
   var nextBtn = saleListBtn.find('.product_next_btn');
   var prevBtn = saleListBtn.find('.product_prev_btn');
   var j =0;
   

   // next button 이벤트
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
   
   nextBtn.on('mouseenter',function(e){
     e.preventDefault();
     nextBtn.find('button').css({ transform: 'scale('+1.2+')', backgroundColor : '#'+26323855 });
   })
   nextBtn.on('mouseleave',function(e){
     e.preventDefault();
     nextBtn.find('button').removeAttr('style');
   });


   // prev button 이벤트__________________________________
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

   prevBtn.on('mouseenter',function(e){
     e.preventDefault();
     prevBtn.find('button').css({ transform: 'scale('+1.2+')', backgroundColor : '#'+26323855 });
   })
   prevBtn.on('mouseleave',function(e){
     e.preventDefault();
     prevBtn.find('button').removeAttr('style');
   });

    //++++++++++++
    
    prodListBox.html('<ul class="clearfix tab_list"></ul>');
    var tabList = prodListBox.find('.tab_list');

    // //함수
    var tabMenuSetFn = function(k){


      var listBoxSet = '<li><a href="#"><div class="a_inner"><div class="img_thumb img_area"></div><div class="list_contant"><div class="title_inner"><span><p class="brand"></p></span><span><p class="title"></p></span></div><div class="product_price"><em class="now_price"></em><p class="price"></p></div><div class="product_tag"></div></div></div></a></li>';

      var a = 0;
      var liIdx, tSet;
      var url ='../img/product/';

      for ( ; a <= prodLen ; a+=1){
        
        tabList.append(listBoxSet);
        
        liIdx = tabList.find('li').eq(a);
        tSet = saleCate[a];
        
        liIdx.find('.brand').text(tSet.brand);
        liIdx.find('.title').text(tSet.product_name);
        liIdx.find('.now_price').text(tSet.price);
        
        liIdx.find('.price').text(tSet.sale);
        
        liIdx.find('.img_thumb').css({backgroundImage :'url('+ url+tSet.image+')'});
        // liIdx.find('a').attr({hrefText}); // 개별 아이템 상세페이지 링크 추가하기
        console.log('?:'+tSet.product_name);
      }//for
      
      
    }; // tabMenuSetFn()
    
  
    tabMenuSetFn(0); // 첫 화면에서 보여줄 상품
    
 
    


  


}); //$.ajax(data)






  
})(jQuery);