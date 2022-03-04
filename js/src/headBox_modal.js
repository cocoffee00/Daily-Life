// 


(function($){

// 한국어 클릭시 모달창 open , close button + 바탕 클릭시 닫기


//변수
const navBox = $('#navBox');
const unb = navBox.children('.unb');
const modalWindow = $('.modal_window');

// unb안에 ul,li만들기
const mkUnb =  '<ul class="clearfix"><li><a href="./login.html"><p>로그인</p></a></li><li><a href="./join_page.html"><p>회원가입</p></a></li><li><button type="button"><p>한국어</p></button></li></ul>'
unb.append(mkUnb);

// 모달 만들기
const mkModal = '<div class="modal_data"><div class="close_btn"><button type="button">  <span class="blind">닫기</span><i class="fa-solid fa-xmark"></i></button></div><div class="modal_content"><h2>국가/언어/통화 선택</h2><span class="content1"><p></p></span></div></div><div class="modal_bg"></div>';
modalWindow.html(mkModal);

let languageBtn = unb.find('button');
let modalCloseBtn = modalWindow.find('button');
let modalBg = modalWindow.find('.modal_bg');


languageBtn.on('click',function(e){
  e.preventDefault();
  modalWindow.stop().fadeIn();
});
modalCloseBtn.on('click',function(e){
  e.preventDefault();
  modalWindow.stop().fadeOut();
});

modalBg.on('click',function(e){
  e.preventDefault();
  modalWindow.stop().fadeOut();
});



























})(jQuery);