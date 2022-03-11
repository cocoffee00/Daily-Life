// blogBox.js

(function($){

  // 테스트용 더미 데이터 ==========================================
  var jsonData = [
    {'title' : '건강한 하루를 만드는 습관 5',
      'img' : 'blog_01_thumb.png'},
    {'title' : '비타민의 7가지 효능',
    'img' : 'blog_02_thumb.png'},
    {'title' : '하루 10분의 러닝이 생활을 바꾼다.',
    'img' : 'blog_03_thumb.png'}
  ];
  //================================================================

  // 공통변수
  var blogBox = $('#blogBox');
  var blogArea = blogBox.children('.blog_area');
  var data = jsonData;
  var dataLen = data.length;
  

  // 기본 레이아웃 구역 생성
  var blogTitlePartSet = '<div class="blog_title_part"></div>'
  var blogConPartSet = '<div class="blog_content"></div>'
  blogArea.append(blogTitlePartSet);
  blogArea.append(blogConPartSet);

  // 갤러리 타이틀 구역 생성
  var titlePart = blogArea.find('.blog_title_part');
  var titleInnerSet = ' <div class="blog_title"><h3>Daily Blog</h3></div><span><p>데일리 라이프 블로그에 방문하여 다양한 정보를 확인해보세요.</p></span><ul class="clearfix"></ul></div>'
  titlePart.html(titleInnerSet);




  //===========================================다시 수정하기=====================
  // 갤러리 버튼 구역 생성
  
  var test = function(tit,img){
    
    var titleUl = titlePart.find('ul');
    var titleLiSet = '<li><button type="button"><span class="blind"></span><div class="contant_thumbnail"></div><span>'+tit+'</span></button></li>';
    titleUl.append(titleLiSet);

    
    var url = '../img/blog/';
    
    var btnImg = titleUl.find('.contant_thumbnail');
    btnImg.css({backgroundImage : 'url('+url+img+')'});
    console.log(url+img);

  }

  var i = 0;
  for( ; i<dataLen; i+=1){
    test(data[i].title,data[i].img);
    // console.log(data[i].img);
  };
  

  
  // var test = function(tit,img){

  //   var btnImg= btnImg.css({backgroundImage : 'url('+url+img+')'});
    
  //   var titleUl = titlePart.find('ul');
  //   var titleLiSet = '<li><img src="'+btnImg+'" alt=""><span>'+tit+'</span></li>';
  //   titleUl.append(titleLiSet);

  // };

  // var test2 = function(n){

  // }


  

  // 갤러리 이미지 구역 생성
  var blogContent = blogArea.find('.blog_content');

  var blogConSet = '<div class="blog_content"><a href="#"><div class="blog_gallery on"><span class="blind"></span></div></a></div>';
  blogContent.html(blogConSet);
  
  var titleLi = titlePart.children('li');
  var titleBtn = titleLi.children('button');




  //이벤트
  // titleBtn.on('click',function(e){
  //   e.preventDefault();
  //   var clickBtn = $(this).parent().index();
  //   // console.log(clickBtn);
  // })

  



})(jQuery);