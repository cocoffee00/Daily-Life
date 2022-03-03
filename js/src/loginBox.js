


(function($){

const body = $('body');
const headBox = $('#headBox');
const loginBox = $('#loginBox');
const footBox = $('#footBox');

const baseUrl = '../page/common/';
const mainUrl = '../page/main/';
const importPage = ['headBox.html','loginBox.html','footBox.html'];

// headBox.html 불러오기
headBox.load(baseUrl + importPage[0],function(){
  body.append('<script src="../js/src/headBox_modal.js"></script><script src="../js/src/headBox_menu_tab.js"></script>');
});

// loginBox.html 불러오기
loginBox.load(mainUrl + importPage[1]);

// footBox.html 불러오기
footBox.load(baseUrl+importPage[2]);


})(jQuery);