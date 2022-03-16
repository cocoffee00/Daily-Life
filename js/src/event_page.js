
(function($){

 
  $.ajax({url : "../data/event.json"}).done(function(data){

    // 변수
    var eventArr = [];
    var dataFile = data;
    var dataLen = dataFile.length;
    var i = 0;

    var eventBox = $('#eventBox');
    var eventArea = eventBox.children('.event_area');

    for( i=0 ; i < dataLen ; i+=1){
      eventArr.push(dataFile[i]);
    };

    // 기본 레이아웃 구현 파트
    var evtWrapSet = '<div class="banner_area img_area"></div><div class="evt_tab_area"></div><div class="content_area gray_bottom_line"></div><div class="page_wrap"></div>';
    eventArea.append(evtWrapSet);

    // 배너 파트 구현 파트
    var bannerArea = eventArea.find('.banner_area');
    var bannerTitleSet = '<div class="evt_banner_title"><span>event</span><span>daily life의 다양한 이벤트를 통해 많은 혜택을 누려보세요</span></div>'
    bannerArea.html(bannerTitleSet);

    // 탭 파트 구현 파트
    var evtTabArea = eventArea.find('.evt_tab_area');
    var eventTabWrapSet = '<div class="event_tab_wrap"><button type="button" class="ongoing on">진행중인 이벤트</button><button type="button" class="announcemen">당첨자발표</button></div>';
    evtTabArea.html(eventTabWrapSet);

    var eventTapWrap = evtTabArea.find('.event_tab_wrap');
    var evtTabBtn = eventTapWrap.find('button');

    // 이벤트 리스트 구현 파트
    var contentArea = eventArea.find('.content_area');
    var url = "../../img/event/"
    var eventListWrap;

    // 이벤트 리스트 구현 함수
    var evetListSetFn = function(i){
      var eventListWrapSet = '<div class="event_list_wrap"><a href="#"><div class="img_box"></div><div class="title_box"><span class="sub_title"></span><span class="title"></span><div><div class="round_box">이벤트기간</div><div class="period"></div></div></div></a></div>';
      
      for ( ; i<dataLen ; i+=1){
        contentArea.append(eventListWrapSet);

        eventListWrap = contentArea.find('.event_list_wrap').eq(i);
        var evtSet = eventArr[i];
        
        eventListWrap.find('a').attr({href : evtSet.link});
        eventListWrap.find('.img_box').css({ backgroundImage : 'url("'+url+evtSet.image+'")'});
        eventListWrap.find('.sub_title').text(evtSet.sub_title);
        eventListWrap.find('.title').text(evtSet.title);
        eventListWrap.find('.period').text(evtSet.period);
      } // for
    } // evetListSetFn()

    evetListSetFn(0);

    // 탭 버튼 클릭 이벤트
    evtTabBtn.on('click',function(e){
      e.preventDefault();
      eventListWrap = contentArea.find('.event_list_wrap');

      var j = $(this).index();

      evtTabBtn.eq(j).addClass('on');
      evtTabBtn.eq(j).siblings().removeClass('on');
      
      if( j === 0 ){
        eventListWrap.stop().show();
      }else{
        eventListWrap.css({ display : 'none'});
      }
    }) // evtTabBtn.on()




  }); //$.ajax
})(jQuery);