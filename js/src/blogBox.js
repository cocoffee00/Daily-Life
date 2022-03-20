// blogBox.js

(function($){

  // 테스트용 더미 데이터 ==========================================
  var jsonData = [
    {'title' : '건강한 하루를 만드는 습관 5가지',
      'image' : 'blog_01_thumb.png'},
    {'title' : '하루 10분의 러닝이 생활을 바꾼다.',
    'image' : 'blog_02_thumb.png'},
    {'title' : '비타민의 7가지 효능',
    'image' : 'blog_03_thumb.png'}
  ];
  //================================================================

  // 공통변수
  var blogBox = $('#blogBox');
  var blogArea = blogBox.children('.blog_area');
  var data = jsonData;
  var dataLen = data.length;
  var url = '../img/blog/';
  
  

  // 기본 레이아웃 구역 생성
  var blogTitlePartSet = '<div class="blog_title_part"></div>'
  var blogConPartSet = '<div class="blog_content"></div>'
  blogArea.append(blogTitlePartSet);
  blogArea.append(blogConPartSet);

  // 갤러리 타이틀 구역 생성
  var titlePart = blogArea.find('.blog_title_part');
  var titleInnerSet = ' <div class="blog_title"><h2>Daily Blog</h2></div><span><p>데일리 라이프 블로그에 방문하여 다양한 정보를 확인해보세요.</p></span><ul class="clearfix"></ul></div>'
  titlePart.html(titleInnerSet);


   // 갤러리 이미지 구역 생성
  
   var blogContent = blogArea.find('.blog_content');
   var blogConSet = '<div><div class="blog_gallery"><div class="img_wrap"><span></span><div class="more"><a href="#"><spna>자세히보기</span></a></div></div></div></div>';
   blogContent.append(blogConSet);
   
   var blogDiv = blogContent.children('div');
   var divImg = blogDiv.find('.blog_gallery');
   var moreBtn = divImg.find('.more');
   var moreA = moreBtn.find('a');

   // 메인 컨텐츠 내용 구성하기
   var mainBlogFn =function(a){
    var blogTitle = blogDiv.find('span');
    var dataN = data[a]
    
    divImg.css({backgroundImage : 'url('+url+dataN.image+')'});
    blogTitle.text(dataN.title)
   }
   mainBlogFn(0);

  // 메인 컨텐츠 마우스 오버 적용
   moreBtn.on('mouseover',function(){
    moreA.css({borderRadius : '10px' ,backgroundColor: 'rgba(100, 100, 100, 0.5)' });
   })
   moreBtn.on('mouseleave',function(){
    moreA.removeAttr('style');
   })
  

  // 갤러리 버튼 구역 생성 ====================================================수정하기 
  var titleUl = titlePart.find('ul');
  var titleLiSet = '<li><button type="button"><div class="tunmb_wrap"><div class="contant_thumbnail"></div></div><span></span></button></li>';
  var i = 0;
  
  // 각 버튼마다 제이슨에서 불러운 이미지 및 타이틀 담기
  var subTitleFn = function(n){
    titleUl.append(titleLiSet);
    
    var dataN = data[n];
    var btnLiN = titleUl.find('li').eq(n);
    var btnTitle = btnLiN.find('span');
    var btnImg = btnLiN.find('.contant_thumbnail');
    
    btnTitle.text(dataN.title)
    btnImg.css({backgroundImage : 'url('+url+dataN.image+')'});
  }
  
  for ( ; i < dataLen ; i+=1 ){
    subTitleFn(i);
  }
  

  // 버튼 클릭시 이벤트
  var titleBtn = titleUl.find('button');
  
  titleBtn.on('click',function(e){
    e.preventDefault();
    var i = $(this).parent().index();
    mainBlogFn(i)
  }) // titleBtn.on()


})(jQuery);