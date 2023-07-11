// -------- List of publication --------

// So I have problem with core policy ...
$.getJSON("publication.json", function(json) {
    document.getElementById("ADS").textContent = json;
})

$(document).ready(function() {
    $.ajax({
        url: 'https://api.adsabs.harvard.edu/v1/search/query?q=star&fl=bibcode',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization","Bearer MPO6caNhGOjkCeT7ebkh8GyksYnbOeDfzb0hpiZk");
        }, 
        headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'},
        success: function(data){
            alert(data);
            document.getElementById("ADS").textContent = data;
        },
    })
});
    

// -------- Line under titles --------

$(document).ready(function() {
    
    // Get max width
    var max = 0;
    var width = 0
    for (var i = 0; i < document.getElementsByClassName("sec").length; i++) {
    
        width = document.getElementsByClassName("sec")[i].clientWidth
        if (width*1 > max*1){ max = width;}
    };
    
    // Set width to all bars
    for (var i = 0; i < document.getElementsByClassName("rounded").length; i++) {
        document.getElementsByClassName("rounded")[i].style.width = (max+50)+'px';
    };

    
});

// -------- Srcoll of images --------

var scrollHandler = null;
  
function autoScroll () {
    clearInterval(scrollHandler);
    scrollHandler = setInterval(function() {
      var nextScroll = document.getElementById("public").scrollLeft += 1;
    },1);
}

 function handleOnScroll () {
  clearInterval(scrollHandler);
  setTimeout(autoScroll, 200);
 };
 
 autoScroll();