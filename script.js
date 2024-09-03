// -------- List of publication --------

query = "q=author%3AJuillard%2C+Sandrine&fl=title%2C+author%2C+bibcode%2C+year%2C+abstract%2C+doctype&rows=40";
function href(adress){window.location=adress;}

function loadpub(){
    ajaxProxy.init();
    
    var loader = document.getElementsByClassName('loader')[0];
    if (loader != null) {
        loader.style.display = "block";
    }
    var apiUrl = 'https://api.adsabs.harvard.edu/v1/search/query?'+query;
    $.ajax({
        url: apiUrl,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization","Bearer MPO6caNhGOjkCeT7ebkh8GyksYnbOeDfzb0hpiZk");
        },
        dataType: "text",
        jsonp: 'callback',
        jsonpCallback: false,  
        headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'},
        success: function(data){
            var loader = document.getElementsByClassName('loader')[0];

            var json = JSON.parse(data)['response']['docs'];
            var info_type = ["title", "year", "author", "abstract"];
            document.getElementById("ADS").innerHTML = "";

            for (var i=0;i<json.length-1;++i)
            {
                var publication_i = document.createElement("li");

                for (var k=0;k<info_type.length;++k){
                
                    // Content from JSON
                    var info = info_type[k]
                    var content = json[i][info]
                    

                    if (info == "title"){
                        content = content[0];
                        var adress = "'https://ui.adsabs.harvard.edu/abs/"+json[i]['bibcode']+"/abstract'";
                    }
                    if (info == "author"){
                    
                        // Parse author list
                        var tmp_content = content.splice(0, 3);
                        if(content.length > 3){
                            tmp_content.push("et al.");
                        }
                        tmp_content.join(',    ');
                        content = tmp_content;
                        
                        // Mark first author as class element
                        if (content[0].includes("Juillard")){
                            publication_i.classList.add("firstAuthor");
                            
                        }
                        
                    }
                
                    // Create div
                    var ele = document.createElement("div");

                    // Need to change because abstract can also be a type of publication
                    if (info == "abstract"){ ele.classList.add("abs"); }
                    else{ ele.classList.add(info); }

                    ele.appendChild(document.createTextNode(content));
                    publication_i.appendChild(ele);
                }
                
                publication_i.classList.add(json[i]["doctype"]);
                publication_i.setAttribute("onclick", 'href('+adress+')');
                document.getElementById("ADS").appendChild(publication_i);

            }

            loader.style.display = "None";

        },
        error:function (xhr, ajaxOptions, thrownError){
            var loader = document.getElementsByClassName('loader')[0];
            var adsbox = document.getElementById("ADS")
            adsbox.innerHTML = "<p>Oops, someting went wrong..   <button type='button' onclick='loadpub()'>Retry ?</button></p> <p>Error "+xhr.status+" ="+xhr.responseText+"</p>"
            loader.style.display = "None";
        },
    })


};

function FirstAuthor(){
    
    if (document.getElementById("FirstAuthor").classList.contains("buttomHidden")){
        var public_list = document.getElementById("ADS").children;
        for (var k=0;k<public_list.length;++k){
            var ele = public_list[k];
            if (!ele.classList.contains("firstAuthor")){
                if (ele.classList.contains("article") || !document.getElementById("Journal").classList.contains("buttomHidden")){
                    if (ele.className != "loader"){
                        ele.style.display = "grid";
                    }
                }
            }
        }
        document.getElementById("FirstAuthor").className = "buttomVisible";
        if (!document.getElementById("Journal").classList.contains("buttomHidden")){
            document.getElementById("All").className = "buttomHidden";
        }
    }
    else{
        var public_list = document.getElementById("ADS").children;
        for (var k=0;k<public_list.length;++k){
            var ele = public_list[k];
            if (!ele.classList.contains("firstAuthor")){
                ele.style.display = "none";
            }
        }
        document.getElementById("FirstAuthor").className = "buttomHidden";
        document.getElementById("All").className = "buttomVisible";
    }
}

function Journal(){

    if (document.getElementById("Journal").classList.contains("buttomHidden")){
        var public_list = document.getElementById("ADS").children;
        for (var k=0;k<public_list.length;++k){
            var ele = public_list[k];
            if (!ele.classList.contains("article")){
                if (ele.classList.contains("firstAuthor") || !document.getElementById("FirstAuthor").classList.contains("buttomHidden")){
                    if (ele.className != "loader"){
                        ele.style.display = "grid";
                    }
                }
            }
        }
        document.getElementById("Journal").className = "buttomVisible";
        if (!document.getElementById("FirstAuthor").classList.contains("buttomHidden")){
            document.getElementById("All").className = "buttomHidden";
        }
    }
    else{
        var public_list = document.getElementById("ADS").children;
        for (var k=0;k<public_list.length;++k){
            var ele = public_list[k];
            if (!ele.classList.contains("article")){
                ele.style.display = "none";
                
            }
        }
        document.getElementById("Journal").className = "buttomHidden";
        document.getElementById("All").className = "buttomVisible";
    }
}

function All(){

    var public_list = document.getElementById("ADS").children;
    for (var k=0;k<public_list.length;++k){
        var ele = public_list[k];
        if (ele.className != "loader"){
            ele.style.display = "grid";
        }
    }
    document.getElementById("All").className = "buttomHidden";
    document.getElementById("FirstAuthor").className = "buttomVisible";
    document.getElementById("Journal").className = "buttomVisible";


}

function suiv(){alert("Not implemented");}
function prev(){alert("Not implemented");}

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


// -------- Nav bar --------

$(document).ready(function() {

const button = document.getElementById('currentpage');

    var link = localStorage['last_page'] || 'into';
    gotosec(link)

});

function gotosec(link){
    const button = document.getElementById('currentpage');

    surl="pages/"+link+".html"

    $.ajax({
        url: surl, 
        context: document.body,
        success: function(response) {
            button.innerHTML = response;
            var navbar = document.getElementById("topnav")
            var headband = document.getElementById("head-band")
            var barcolor = document.getElementsByClassName("rounded")[0]
            headband.style["background-color"] = barcolor.style["background-color"]
            navbar.style["background-color"] = barcolor.style["background-color"]

        }
    });

    var oldpage = document.getElementById("topnav").getElementsByClassName("active")[0]
    oldpage.className = "";

    var newpage = document.getElementById(link)
    newpage.className = "active";

    if (link == "publi"){
        loadpub();
        autoScroll();
    }

    localStorage['last_page'] = link



}
// -------- Srcoll of images --------

var scrollHandler = null;
  
function autoScroll () {
    clearInterval(scrollHandler);

    var endscroll = document.getElementById("public")
    scrollHandler = setInterval(function() {
        if (document.getElementById("public") == null){
        // Nothing to do, page isn't showing.
        }
        else{
            var endscroll = document.getElementById("public").scrollWidth/3;
            document.getElementById("public").scrollLeft += 1;
            if (document.getElementById("public").scrollLeft > endscroll+500){
                document.getElementById("public").scrollLeft -= endscroll;
            }
            if (document.getElementById("public").scrollLeft < endscroll-500){
                document.getElementById("public").scrollLeft += endscroll;
            }
        }

    },0.01);
}

 function handleOnScroll () {
  clearInterval(scrollHandler);
  setTimeout(autoScroll, 5);
 };
 
$(document).ready(function() {
    autoScroll();
});
 
 
 
 
 