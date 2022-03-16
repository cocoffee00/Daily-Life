// sub_import_data.js

(function($){

  var body = $('body');
  var headBox = $('#headBox');
  var footBox = $('#footBox');
  var eventBox = $('#eventBox');
  
  var baseUrl = '../page/common/';
  var mainUrl = '../page/main/';

  var importPage = ['headBox.html','footBox.html','event_box.html'];

//headBox.html 불러오기
  headBox.load(baseUrl + importPage[0],function(){
    body.append('<script src="../js/src/headBox_modal.js"></script><script src="../js/src/headBox_menu_tab.js"></script>');
  });
  
  // event_box.html 불러오기
  eventBox.load(mainUrl + importPage[2],function(){
    body.append('<script src="../js/src/event_page.js">')
  });



// footBox.html 불러오기
  footBox.load(baseUrl+importPage[1]);



})(jQuery);