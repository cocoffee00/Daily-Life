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
  var titleInnerSet = ' <div class="blog_title"><h3>blog title</h3></div><span><p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p></span><ul class="clearfix"></ul></div>'
  titlePart.html(titleInnerSet);

  // 갤러리 버튼 구역 생성
  
  var test = function(tit,img){
    
    var titleUl = titlePart.find('ul');
    var titleLiSet = '<li><button type="button"><span class="blind"></span><div class="contant_thumbnail"></div><span>'+tit+'</span></button></li>';
    titleUl.append(titleLiSet);

    
    var url = '../img/blog/';
    
    var btnImg = titleUl.find('.contant_thumbnail');
    btnImg.css({backgroundImage : 'url('+url+img+')'});
    // console.log(url+img);

  }

  var i = 0;
  for( ; i<dataLen; i+=1){
    test(data[i].title,data[i].img);
  };
    
  
  
  
  var titleLi = titlePart.children('li');
  var titleBtn = titleLi.children('button');
  var tumbnail = titleLi.find('.contant_thumbnail');

  //이벤트
  titleBtn.on('click',function(e){
    e.preventDefault();
    var clickBtn = $(this).parent().index();
    console.log(clickBtn);
  })

  

  // 갤러리 이미지 구역 생성
  var blogContent = blogArea.find('.blog_content');

  var blogConSet = '<div class="blog_content"><a href="#"><div class="blog_gallery"><span class="blind"></span></div></a></div>';
  blogContent.html(blogConSet);



})(jQuery);