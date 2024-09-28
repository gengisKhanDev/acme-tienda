isInViewPort = (selector, newClass) => {
  var previousScroll = 0;
  $(window).scroll(function(){
    var currentScroll = $(this).scrollTop();

    var topOffElement = $(selector).offset().top;
    var bottomOfElement = $(selector).offset().top + $(selector).outerHeight();
    var bottomOfScreen = $(window).scrollTop() + $(window).innerHeight();
    var topOfScreen = $(window).scrollTop();

    if(currentScroll > previousScroll){
      if((bottomOfScreen > topOffElement) && (topOfScreen < bottomOfElement)){
        setTimeout(function(){
          $(selector).addClass(newClass);
        }, 750);
      }
      else {
        $(selector).removeClass(newClass);
      }
    }
    previousScroll = currentScroll;
  });
}
