var scrollHandler = null;
  
function autoScroll () {
    clearInterval(scrollHandler);
    scrollHandler = setInterval(function() {
      var nextScroll = document.getElementById("public").scrollLeft += 1;
    },50);
}

 function handleOnScroll () {
  // Stop interval after user scrolls
  clearInterval(scrollHandler);
  // Wait 2 seconds and then start auto scroll again
  // Or comment out this line if you don't want to autoscroll after the user has scrolled once
  setTimeout(autoScroll, 200);
 };
 
 autoScroll();
