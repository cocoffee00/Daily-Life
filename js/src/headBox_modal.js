// 


(function($){

// 한국어 클릭시 모달창 open , close button + 바탕 클릭시 닫기


//변수
var navBox = $('#navBox');
var unb = navBox.children('.unb');
var modalWindow = $('.modal_window');

// unb안에 ul,li만들기
var mkUnb =  '<ul class="clearfix"><li><a href="./login.html"><p>로그인</p></a></li><li><a href="./join_page.html"><p>회원가입</p></a></li><li><button type="button"><p>한국어</p></button></li></ul>'
unb.append(mkUnb);

// 모달 만들기
var mkModal = '<div class="modal_data"><div class="close_btn"><button type="button">  <span class="blind">닫기</span><i class="fa-solid fa-xmark"></i></button></div><div class="modal_content"><h2>국가/언어/통화 선택</h2><span class="content1"><p></p></span></div></div><div class="modal_bg"></div>';
modalWindow.html(mkModal);

var languageBtn = unb.find('button');
var modalCloseBtn = modalWindow.find('button');
var closeIcon = modalWindow.find('.fa-xmark');
var modalBg = modalWindow.find('.modal_bg');

var loginBtn = unb.find('li').eq(0);
var joinBtn = unb.find('li').eq(1);

// 로그인,회원가입 영역에 mouseenter시 글씨크기 변경/되돌리기
loginBtn.on('mouseenter',function(e){
  e.preventDefault();
  loginBtn.css({  fontWeight : 700 });
});
loginBtn.on('mouseleave',function(e){
  e.preventDefault();
  loginBtn.removeAttr('style');
});
joinBtn.on('mouseenter',function(e){
  e.preventDefault();
  joinBtn.css({  fontWeight : 700 });
});
joinBtn.on('mouseleave',function(e){
  e.preventDefault();
  joinBtn.removeAttr('style');
});


languageBtn.on('click',function(e){
  e.preventDefault();
  modalWindow.stop().fadeIn();
});
modalCloseBtn.on('click',function(e){
  e.preventDefault();
  modalWindow.stop().fadeOut();
});

modalCloseBtn.on('mouseenter',function(e){
  e.preventDefault();
  closeIcon.css({ transform: 'scale('+2+')'});
});
modalCloseBtn.on('mouseleave',function(e){
  e.preventDefault();
  closeIcon.removeAttr('style');
});


modalBg.on('click',function(e){
  e.preventDefault();
  modalWindow.stop().fadeOut();
});



























})(jQuery);