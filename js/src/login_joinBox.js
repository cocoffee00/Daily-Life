
// login_joinBox.js
// login,join js 통합

(function($){

// 변수
var body = $('body');
var headBox = $('#headBox');
var loginBox = $('#loginBox');
var joinBox = $('#joinBox');
var footBox = $('#footBox');

var baseUrl = '../page/common/';
var mainUrl = '../page/main/';
var importPage = ['headBox.html','loginBox.html','joinBox.html','footBox.html'];

// headBox.html 불러오기
headBox.load(baseUrl + importPage[0],function(){
  body.append('<script src="../js/src/headBox_modal.js"></script><script src="../js/src/headBox_menu_tab.js"></script>');
});

// loginBox.html 불러오기
loginBox.load(mainUrl + importPage[1]);

// joinBox.html 불러오기
joinBox.load(mainUrl + importPage[2]);

// footBox.html 불러오기
footBox.load(baseUrl+importPage[3]);


})(jQuery);