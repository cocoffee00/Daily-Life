//main_import_data.js

(function($){

  //공통영역 불러오기=============================
  //변수
  const body = $('body');
  const headBox = $('#headBox');
  const footBox = $('#footBox');
  const baseUrl = "../page/common/";
  let importPage = ['headBox.html','footBox.html'];

  //기능수행

  // 헤드박스 정리 수정중
  // headBox.load(baseUrl+importPage[0],function(){
  //   body.append('<script src="../js/src/headBox.js"></script>');
  // });
  headBox.load(baseUrl+importPage[0],function(){
    body.append('<script src="../js/src/headBox_modal.js"></script><script src="../js/src/headBox_menu_tab.js"></script>');
  });

  // js: 모달이랑 탭기능이랑 합칠지 고민
  footBox.load(baseUrl+importPage[1]);




  //메인영역 불러오기===========================
  //변수
  const slideBox = $('#slideBox');
  const bestBox = $('#bestBox');
  const saleBox = $('#saleBox');
  const newBox = $('#newBox');
  const blogBox = $('#blogBox');
  const mainUrl ="../page/main/";
  let importMain = ['slideBox.html','bestBox.html','saleBox.html','newBox.html','blogBox.html'];
  let mainSelect = [slideBox,    bestBox,    saleBox,    newBox,    blogBox ];
  
  let importLen = importMain.length;
    //기능수행
  // slideBox.load(mainUrl+importMain[0]);
  // bestBox.load(mainUrl+importMain[1]);
  // saleBox.load(mainUrl+importMain[2]);
  // newBox.load(mainUrl+importMain[3]);
  // blogBox.load(mainUrl+importMain[4]);

  // let i = 0;
  // for ( ; i < importLen ; i+=1 ){
  //   mainSelect[i].load(mainUrl+importMain[i]);
  // }

  $.each(mainSelect,function(idx,selector){
    selector.load(mainUrl+importMain[idx],function(){
      if( idx === 0){
        body.append('<script src="../js/src/slideBox.js" class="pc_slide"></script>');
      }else if ( idx === 1) {
        body.append('<script src="../js/src/bestBox.js" class="pc_slide"></script>')
      }
    });
  });

})(jQuery);