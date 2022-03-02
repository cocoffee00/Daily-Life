// slideBox.js


(function($){

var jsonData = $.getJSON('../data/daily_slide.json');
jsonData.done(function(data){

  //공통변수
  const slideData = data;
  const slideBox = $('#slideBox');
  const slideBg = $('.slide_bg');
  const slideType = 'horizontal_slide';
  const dataLen = slideData.length;

  let viewCover;
  let setNum = 0;
  let beforeN = setNum;
  let timed = 1000;
  let play;
  let permission = true;


  //기능구현
  let slideWrapperSet = '<div class="slide_bg"><div class="slide_wrapper"></div></div>'
  slideBox.append(slideWrapperSet);

  let slideWrapperCode = slideBox.find('.slide_wrapper');
  slideWrapperCode.addClass('position_slide');

  let slideDivSet = '<div class="view_cover"><a href="#"><span class="blind">광고 01</span></a></div>';


  // 함수--------------버튼 생성
  let slideBtnFn = function (){
    let insertBtn = '<div class="slide_btn"><button type="button" class="next_btn"><span class="blind">next</span></button><button type="button" class="prev_btn"><span class="blind">prev</span></button></div>';
    slideWrapperCode.before(insertBtn);
    // 버튼은 슬라이드보다 전에 생성 (버튼-인디케이터-슬라이드)
  };//slideBtnFn()


  // 함수----------------position 슬라이드에 이미지 및 링크 적용
  let slideDivSetFn = function(n){
    slideWrapperCode.append(slideDivSet);
    slideWrapperCode.children('div').eq(i).addClass(slideData[i].title);
      //변수
      let slideN =slideData[n];
      let imgUrl = '../img/slide/';
      let slideDiv = slideWrapperCode.children('div').eq(n);
      let divImage = slideDiv.find('.image');
      let divLink = slideDiv.find('a');

      //기능
      slideDiv.addClass(slideN.title);
      slideDiv.css({backgroundImage : 'url('+imgUrl+slideN.img+')'});
      divLink.attr({href:slideN.link});
  };//slideDivSetFn()


  // 2.함수--------- 광고위치 표시기능
  let actionFn = function(i){

    viewCover = $('.view_cover');
    // viewCover.eq(i).siblings().removeClass('action');

    //기능수정
    if( i === beforeN){
      viewCover.eq(i).addClass('action');
    }else{
      viewCover.eq(i).stop().fadeIn();
      viewCover.eq(beforeN).stop().fadeOut(function(){
        viewCover.eq(beforeN).removeClass('action');
        viewCover.eq(i).addClass('action');
        beforeN = setNum;
      })
    }
  };//actionFn()

  let i = 0;
  for ( ; i < dataLen ; i += 1){
    slideDivSetFn(i);
  };

  actionFn(setNum); // for문 생성 후 적용
  slideBtnFn(); // 버튼 생성 



  //===========================================인디케이터

  const indiWrapper = '<div class="slide_indi_ck"><ul class="slide_indicator blind_area"></ul><div class="indi_counter"><p><em class="now">0</em>/<span class="total">0</span></p></div></div>';
  let indiCode = '<li><a href="#" data-href="#"><span></span></a></li>'

  slideWrapperCode.before(indiWrapper);
  let indiWrappSelector = slideBox.find('.slide_indicator');
  let slideIndiCk = slideBox.find('.slide_indi_ck');
  let viewLenCkNow = slideIndiCk.find('.now');
  let viewLenCkTotal = slideIndiCk.find('.total');
  let indiSelector;

  //함수=====인디케이터 안에 데이터 적용
  let indicatorSetFn = function(n){
    indiWrappSelector.append(indiCode);

    indiSelector = indiWrappSelector.find('li');
    let indiLiLink = indiSelector.eq(n).find('a');
    let indiLiSpan = indiLiLink.children('span');

    indiLiLink.attr({'data-href':slideData[n].id});
    indiLiSpan.text(slideData[n].summary);
  };//indicatorSetFn()

  // 함수=====인디케이터 카운터
  let indiCatorCkFn = function(n){
    viewLenCkNow.text(n+1);
    viewLenCkTotal.text(dataLen);
  }//indiCatorCkFn()

  // 인디케이터 생성
  let j = 0;
  for ( ; j <dataLen ; j++ ){
    indicatorSetFn(j);
  };
  indiCatorCkFn(setNum);
  indiSelector.eq(setNum).addClass('action');

  

  //=======================================================버튼//

  //변수
  let nextBtn = slideBox.find('.next_btn');
  let prevBtn = slideBox.find('.prev_btn');

  //함수
  let indiSetFn = function(n){
    indiSelector.eq(n).siblings().removeClass('action');
    indiSelector.eq(n).addClass('action');
  }
  //슬라이드,인디케이터,체크번호 동시에 처리되어야 하는 기능 = 한번에 수행
  let actionNumSetFn = function(n){
    if ( n >= dataLen ){
      n = 0;
      setNum = n;
    }else if( n < 0 ){
      n = dataLen -1;
      setNum = n;
    }

    actionFn(n);
    indiCatorCkFn(n);
    indiSetFn(n);
  }

  //슬라이드가 일정 시간후 움직이도록-------------------------
 let slideGoFn = function(){
  play = setInterval(function(){
    nextBtn.trigger('click');
    }, timed*3);
 };
 let slideStopFn = function(){
   clearInterval(play);
  };
  slideGoFn();
 
  slideBox.on('mouseenter',function(){
    slideStopFn();
  })
  slideBox.on('mouseleave',function(){
    slideGoFn();
  })


  //이벤트 버튼 클릭시 슬라이드 이동----------------------------permission 적용하기
  nextBtn.on('click',function(e){
    e.preventDefault();
    setNum+=1;
    actionNumSetFn(setNum);
    console.log(permission)
  });
  prevBtn.on('click',function(e){
    e.preventDefault();
    setNum-=1;
    actionNumSetFn(setNum);
  });

  //인디케이터 누르면 맞는 광고 표시
  indiSelector.find('a').on('click',function(e){
    e.preventDefault();
    setNum = $(this).parent().index();
    actionNumSetFn(setNum);
  })


}) // jsonData.done()
})(jQuery);