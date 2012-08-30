/*
 * @arthur Scott Johnson 2012
*/ 


$(document).ready(function() {
  // making one long virtual image [1][2][n]
  // $('img.marquee_panel_photo').each(function(index){
  //   var photoWidth = $('.marquee_container').width();
  //   var photoPosition = index * photoWidth;
  //   
  //   $('.marquee_content').append('<img class="marquee_photo" style="left:'+photoPosition + ';" src="'+ $(this).attr('src') +'" alt="' + $(this).attr('alt') + '" width="400" height="250" />');
  //   $('.marquee_content').css('width', photoPosition + photoWidth);
  //   
  // });
  $('.marquee_panel_content').each(function(index){
    var panelWidth = $('.marquee_container').width();
    var panelPosition = panelWidth * index;
    var content = $(this) //.html();
    
    $('.marquee_content').append(content);
    $('.marquee_content').css('width', panelWidth + panelPosition );
  });
  
  // add in the nav elements
  $('.marquee_panels .marquee_panel').each(function(index){
    $('.marquee_nav').append('<a class="marquee_nav_item"></a>');
  });
  
  // manage the click event for the nav elements
  $('.marquee_nav a.marquee_nav_item').click(function(){
    $('.marquee_nav a.marquee_nav_item').removeClass('selected');
    $(this).addClass('selected');
    
    // calculate where to put the virtual image [1][2][n] so the correct image is in the window
    var navClicked = $(this).index();
    var marqueeWidth = $('.marquee_container').width();
    var distanceToMove = marqueeWidth*(-1);
    var newPhotoPosition = navClicked * distanceToMove + 'px'
    var newCaption = $('.marquee_panel_caption').get(navClicked);
    
    // animate and display the correct image
    $('.marquee_content').animate({left:newPhotoPosition}, 1000);
    
    $('.marquee_caption').animate({top:'212px'}, 500, function(){
      var newHTML = $(newCaption).html();
      $('.marquee_caption_content').html(newHTML);
      setCaption();
    });
    
  });
  
  // wait until all images are loaded to initialize
  $('.marquee_panels img').imgpreload(function(){
    initializeMarquee();
  });
});

// have the marquee start out with no images, then have the first one fade in and be selected
function initializeMarquee(){
 $('.marquee_caption_content').html(
   $('.marquee_panels .marquee_panel:first .marquee_panel_caption').html()
  );
  $('.marquee_nav a.marquee_nav_item:first').addClass('selected');
  $('.marquee_content').fadeIn(500); 
  setCaption(); 
}

// get the caption to animate and show on the inital update
function setCaption(){
  var captionHeight = $('.marquee_caption').height();
  var marqueeHeight = $('.marquee_container').height();
  var newCaptionTop = marqueeHeight - captionHeight - 15;
  $('.marquee_caption').delay(100).animate({top:newCaptionTop}, 500);
  
}


