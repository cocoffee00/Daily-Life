// bestBox.js

(function($){

// product.json 불러와서 설정하기______________________________________________________
  
$.ajax({url:'../data/product.json'}).done(function(data){
    
    // 전역변수
      var tabTitle = [];
      var dataFile = data;
      var prodLen = dataFile.length;
      var i = 0;

    // for문으로 json data 내부의 카테고리 값을 배열로 넣음
      for( ; i < prodLen ; i += 1){
        tabTitle.push(dataFile[i].category);
      }; //for

    // 중복되는 배열의 값 정리 (카테고리 내용과 갯수 확인)
    // indexOf : 문자,배열에서 작성한 요소와 일치하는 순서를 확인
      var tabTitleCk = tabTitle.filter(function(data,idx){
        return tabTitle.indexOf(data) === idx; // 배열과 순서값이 일치하는 값만 return
      }); //tabTitleCk()

    // 탭 메뉴 구성에 맞는 목록 체크
    // tabTitleCk의 값과 일치하는 배열들만 모아서 정리 
      var tabMenuSet;
      var tabMenuFn = function(n){
        tabMenuSet = dataFile.filter(function(data){
        return data.category === tabTitleCk[n];
        });
      }; //tabMenuFn()
   
    // title 구성 : tabMenuSet
    // title에 따른 메뉴 구성 : 함수 호출 => tabMenuFn(순서);
    // title에 따른 메뉴 구성 : 구성 사용 => tabMenuSet;

// _____________________________________________________________________________
// 불러온 json기반으로 레이아웃 구성하고 배치하기________________________________

      var bestBox = $('#bestBox');
      var bestArea = bestBox.children('.best_area');
    
    // #bestBox 안에 들어갈 주요 클래스 구역 만들기
      bestBox.html('<div class="best_area"><div class="best_title"><h2>추천상품</h2></div><div class="best_tab"></div><div class="product_list_btn"></div><div class="product_list a_set"></div><div class="product_more_btn"></div></div>');
    
      var bestTab = bestBox.find('.best_tab');
      var bestListBtn = bestBox.find('.product_list_btn'); // 추가 구성하기
      var prodList = bestBox.find('.product_list');
      var prodMoreBtn = bestBox.find('.product_more_btn'); // 추가 구성하기

    // 카테고리별 탭 타이틀 들어갈 구역 만들기
      var bestTabSet = '<h3><span class="blind">추천 상품 카테고리별 네비게이션</span></h3><div class="tab_list"><ul class="clearfix"></ul></div>'; 
      bestTab.append(bestTabSet);

    // 상품 리스트들이 들어갈 구역 만들기
      var bestConSet = '<div class="product_list_box"></div>';
      prodList.append(bestConSet);


  // 카테고리별 탭 만들기__________________________________________________________
    var tabLen = tabTitleCk.length;
    var tabUl = bestTab.find('ul');
    var j =0;

    var tabSet = function(){ 
      var tabLiSet = '<li><button type="button"></button></li>';
      tabUl.append(tabLiSet);
    };

    // 탭 안에 카테고리 텍스트 뿌려주기(tabTitleCk[j];)
    for( ; j < tabLen ; j+=1){
      tabSet(j);
      tabUl.find('button').eq(j).text(tabTitleCk[j]);
    } // for
    
    var tabLi = tabUl.find('li');
    var tabBtn = tabLi.find('button');
    tabLi.eq(0).addClass('on');
    
    // 상품 리스트 내용 구성하기__________________________________________________
    var prodListBox = prodList.find('.product_list_box');


    //++++++++++++ 이전,다음 버튼 + 슬라이드 작성하기
    var btnDiv = '<div class="product_next_btn"><button type="button"><span class="blind">next</span></button></div><div class="product_prev_btn"><button type="button"><span class="blind">prev</span></button></div>';
    bestListBtn.append(btnDiv);

    var nextBtn = bestListBtn.find('.product_next_btn');
    var prevBtn = bestListBtn.find('.product_prev_btn');

    nextBtn.on('click',function(e){
      e.preventDefault();
    });
    //++++++++++++
    
    prodListBox.html('<ul class="clearfix tab_list"></ul>');
    var tabList = prodListBox.find('.tab_list');

    //함수
    var tabMenuSetFn = function(k){

      tabMenuFn(k); //카테고리별 일치하는 배열들만 가져옴
      tabList.empty(); //탭 누를때마다 그 전에 있던 구성들을 비워줘야함

      var listBoxSet = '<li><a href="#"><div class="a_inner"><div class="img_thumb img_area"></div><div class="list_contant"><div class="title_inner"><span><p class="brand"></p></span><span><p class="title"></p></span></div><div class="product_price"><em class="now_price"></em><p class="price"></p></div><div class="product_tag"></div></div></div></a></li>';

      var a = 0;
      var tabSetLen = tabMenuSet.length;
      var liIdx, tSet;
      var url ='../img/product/';

      for ( ; a < tabSetLen ; a+=1){
      
       tabList.append(listBoxSet);

       liIdx = tabList.find('li').eq(a);
       tSet = tabMenuSet[a];

        liIdx.find('.brand').text(tSet.brand);
        liIdx.find('.title').text(tSet.product_name);
        liIdx.find('.now_price').text(tSet.price);
        
        liIdx.find('.price').text(tSet.sale);

        liIdx.find('.img_thumb').css({backgroundImage :'url('+ url+tSet.image+')'});
        // liIdx.find('a').attr({hrefText}); // 개별 아이템 상세페이지 링크 추가하기
      }//for


      //+++++++++++++++++++++++++++++++++
      var horizonLi = tabList.find('li');
      var cloneDiv = function() {horizonLi.eq(-1).clone();
      }
      tabList.prepend(cloneDiv);
      //+++++++++++++++++++++++++++++++++

    }; // tabMenuSetFn()
    
    tabMenuSetFn(0); // 첫 화면에서 보여줄 상품
    
    // 탭 버튼 클릭 이벤트_________________________________________________________
    tabBtn.on('click',function(e){
      e.preventDefault();
      var i =$(this).parent().index(); // 선택된 버튼 순서 파악

      tabBtn.parent().eq(i).addClass('on');
      tabBtn.parent().eq(i).siblings().removeClass('on');

      tabMenuSetFn(i);
      
    }) // tabBtn.on()


    // 더보기 버튼 클릭시 페이지 이동(일단 에러페이지로 연결)____________________________

    var morebtnArea = '<span class="blind">추천상품 더보기</span><a href="./errorPage.html"><div class="more_btn_icon img_area"></div><span>더보기</span></a>';
    prodMoreBtn.append(morebtnArea);

    
  


}); //$.ajax(data)
})(jQuery);