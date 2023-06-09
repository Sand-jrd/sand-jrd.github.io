// -------- List of publication --------

query = "q=author%3AJuillard%2C+Sandrine&fl=title%2C+author%2C+bibcode%2C+year%2C+doctype&rows=40";
function href(adress){window.location=adress;}

$(document).ready(function() {
    $.ajax({
        url: 'https://corsproxy.io/?https://api.adsabs.harvard.edu/v1/search/query?'+query,
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization","Bearer MPO6caNhGOjkCeT7ebkh8GyksYnbOeDfzb0hpiZk");
        }, 
        dataType: "text",       
        headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'},
        success: function(data){
            
            var json = JSON.parse(data)['response']['docs'];
            var info_type = ["title", "year", "author"];
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
                    ele.classList.add(info);
                    ele.appendChild(document.createTextNode(content));
                    publication_i.appendChild(ele);
                }
                
                publication_i.classList.add(json[i]["doctype"]);
                publication_i.setAttribute("onclick", 'href('+adress+')');
                document.getElementById("ADS").appendChild(publication_i);

            }

        },
    })
});

function FirstAuthor(){
    
    if (document.getElementById("FirstAuthor").classList.contains("buttomHidden")){
        var public_list = document.getElementById("ADS").children;
        for (var k=0;k<public_list.length;++k){
            var ele = public_list[k];
            if (!ele.classList.contains("firstAuthor")){
                ele.style.display = "grid";
            }
        }
        document.getElementById("FirstAuthor").className = "";
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
        document.getElementById("All").className = "";
    }
}

function Journal(){

    if (document.getElementById("Journal").classList.contains("buttomHidden")){
        var public_list = document.getElementById("ADS").children;
        for (var k=0;k<public_list.length;++k){
            var ele = public_list[k];
            if (!ele.classList.contains("article")){
                ele.style.display = "grid";
            }
        }
        document.getElementById("Journal").className = "";
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
        document.getElementById("All").className = "";
    }
}

function All(){

    var public_list = document.getElementById("ADS").children;
    for (var k=0;k<public_list.length;++k){
        var ele = public_list[k];
        ele.style.display = "grid";
    }
    document.getElementById("All").className = "buttomHidden";
    document.getElementById("FirstAuthor").className = "";
    document.getElementById("Journal").className = "";


}

function suiv(){alert("Not implemented");}
function prev(){alert("Not implemented");}

function gotmini(){

    var bar = document.getElementById("goto");
    if (!bar.classList.contains("minigoto")){
        for (var i = 0; i < bar.getElementsByClassName("linktosec").length; i++) {
            bar.getElementsByClassName("linktosec")[i].style.display = "none";
        }
        bar.className = "minigoto";
    }else{
        for (var i = 0; i < bar.getElementsByClassName("linktosec").length; i++) {
            bar.getElementsByClassName("linktosec")[i].style.display = "initial";
        }
        bar.className = "";
    }
}

function gotosec(id){document.getElementById(id).scrollIntoView();}



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

// -------- Quick goto --------

$(document).ready(function() {

    var bar = document.getElementById("goto");
    
        for (var i = 0; i < document.getElementsByClassName("sec").length; i++) {
        
            var name = document.getElementsByClassName("sec")[i].id;
            var color = document.getElementsByClassName("sec")[i].style.color;
            
            var ele = document.createElement("div");
            ele.setAttribute('class', 'linktosec');
            ele.setAttribute('onClick', "gotosec('"+name+"');");
            ele.style.color = color;

            ele.appendChild(document.createTextNode(name));
            bar.appendChild(ele);
        };

});


// -------- Srcoll of images --------

var scrollHandler = null;
  
function autoScroll () {
    clearInterval(scrollHandler);
    var endscroll = document.getElementById("public").scrollWidth/2;
    scrollHandler = setInterval(function() {
      document.getElementById("public").scrollLeft += 1;
    },1);
    if (document.getElementById("public").scrollLeft > endscroll+500){
        document.getElementById("public").scrollLeft -= endscroll;
    }
}

 function handleOnScroll () {
  clearInterval(scrollHandler);
  setTimeout(autoScroll, 200);
 };
 
$(document).ready(function() {
    autoScroll();
});
 
 
 
 
 