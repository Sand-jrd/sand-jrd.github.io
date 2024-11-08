// -------- List of publication --------

query = "q=author%3AJuillard%2C+Sandrine&fl=title%2C+author%2C+bibcode%2C+year%2C+abstract%2C+doctype&rows=40&sort=date+desc";
function href(adress){window.location=adress;}

function loadpub(){
    ajaxProxy.init();

    var loader = document.getElementById('loader_icon')
    if (loader != null) {
        loader.style.display = "block";
    }

    var apiUrl = 'https://api.adsabs.harvard.edu/v1/search/query?'+query;
    ajj = $.ajax({
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
        },
        error:function (xhr, ajaxOptions, thrownError){
            var loader = document.getElementsByClassName('loader')[0];
            var adsbox = document.getElementById("ADS")
            adsbox.innerHTML = "<p>Oops, someting went wrong..   <button type='button' onclick='loadpub()'>Retry ?</button></p> <p>Error "+xhr.status+" ="+xhr.responseText+"</p>"
            loader.style.display = "None";
        },        
        complete:function (){
            var loader = document.getElementById('loader_icon')
            loader.style.display = "None";            
        }
    });
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

    // Init map list
    localStorage['last_com'] = 0

    
});


// -------- Nav bar --------

$(document).ready(function() {

const button = document.getElementById('currentpage');

    var link = localStorage['last_page'] || 'into';
    gotosec(link)

    if (link == "com"){
        setMap()
        HomeMap()
        setHeight() 
    }

    if (link == "publi"){
        loadpub();
        autoScroll();
    }

    if (link == "into"){
        add_markdown ()
    }

});

 async function gotosec(link){

    surl="pages/"+link+".html"
    const button = document.getElementById('currentpage');

    await fetch(surl)
    .then(response=> response.text())
    .then(text=> button.innerHTML = text);

    try{
    var oldpage = document.getElementById("topnav").getElementsByClassName("active")[0]
    oldpage.className = "unactive";
    }
    catch(error){
        console.error("No page:", error);
    }


    var newpage = document.getElementById(link)
    newpage.className = "active";

    var navbar = document.getElementById("topnav");
    var headband = document.getElementById("head-band");
    var barcolor = document.getElementsByClassName("rounded")[0];
    headband.style["background-color"] = barcolor.style["background-color"];
    navbar.style["background-color"] = barcolor.style["background-color"];

    if (link == "publi"){
        await loadpub();
        autoScroll();
    }
    if (link == "into"){
        await add_markdown ()
    }

    if (link == "com"){
        await setMap()
        await HomeMap()
        await setHeight() 
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

    },0.001);
};

 function handleOnScroll () {
  clearInterval(scrollHandler);
  setTimeout(autoScroll, 10);
 };
 
$(document).ready(function() {
    autoScroll();
});
 
function add_markdown () {
    const converter = new showdown.Converter(); 
    fetch("greeds.md")
    .then(response=> response.text())
    .then(text=> document.getElementById("markdown-output").innerHTML = converter.makeHtml(text));
};
 
function copypipinstall ()  {
    navigator.clipboard.writeText("pip install GreeDS");
};

function copyimport ()  {
    navigator.clipboard.writeText("from  GreeDS import  GreeDS\nfrom  vip_hci.fits import  open_fits\ncube = open_fits( 'your_cube.fits')\nangles = open_fits( 'your_PA_angles.fits')\nref = open_fits( 'your_refs.fits')");
};

function copygreeds ()  {
    navigator.clipboard.writeText("r = 10 # Iteration over PCA-rank\nl = 10 # Iteration per rank\nr_start = 1 # PCA-rank to start iteration (good for faint signals)\npup_size = 3 # Radius of numerical mask to hide coro\nres = GreeDS(cube, angles, r=r, l=l, r_start=r_start, pup_size=pup_size)");
};

function zoomMap(){

    scale=1.6
    svg = document.getElementById("svgMap");
    container = document.getElementById("map_container").getBoundingClientRect()

    let svgWidth = parseInt(svg.getAttribute('width'));
    let svgHeight = parseInt(svg.getAttribute('height'));
    let contWidth = parseInt(container.width);
    let contHeight = parseInt(container.height);

    focus_left = (document.getElementById("map_container").scrollLeft + contWidth/2) /svgWidth;
    focus_top = (document.getElementById("map_container").scrollTop + contHeight/2) /svgHeight; 

    svg.setAttribute('width', `${(svgWidth * scale)}`);
    svg.setAttribute('height', `${(svgHeight * scale)}`);

    document.getElementById("map_container").scrollLeft = focus_left*svgWidth * scale - contWidth/2;
    document.getElementById("map_container").scrollTop = focus_top*svgHeight * scale - contHeight/2;

};



function unzoomMap(){

    scale=0.6

    svg = document.getElementById("svgMap");
    container = document.getElementById("map_container").getBoundingClientRect()

    let svgWidth = parseInt(svg.getAttribute('width'));
    let svgHeight = parseInt(svg.getAttribute('height'));
    let contWidth = parseInt(container.width);
    let contHeight = parseInt(container.height);

    focus_left = (document.getElementById("map_container").scrollLeft + contWidth/2) /svgWidth;
    focus_top = (document.getElementById("map_container").scrollTop + contHeight/2) /svgHeight; 

    svg.setAttribute('width', `${(svgWidth * scale)}`);
    svg.setAttribute('height', `${(svgHeight * scale)}`);

    document.getElementById("map_container").scrollLeft = focus_left*svgWidth * scale - contWidth/2;
    document.getElementById("map_container").scrollTop = focus_top*svgHeight * scale - contHeight/2;

};

function HomeMap(){
    svg = document.getElementById("svgMap");
    container = document.getElementById("map_container").getBoundingClientRect()
    svg.setAttribute('height', `${(4057*1.5)}`);
    svg.setAttribute('width', `${(5000*1.5)}`);

    ResetLegend()

    EuropeMap()
};

function USAzoom(){
    svg = document.getElementById("svgMap");

    svg.setAttribute('height', `${(4057*1)}`);
    svg.setAttribute('width', `${(5000*1)}`);
    ResetLegend()

    USAMap()

};

function USAMap(){
    svg = document.getElementById("svgMap");
    container = document.getElementById("map_container").getBoundingClientRect()

    let svgWidth = parseInt(svg.getAttribute('width'));
    let svgHeight = parseInt(svg.getAttribute('height'));
    let contWidth = parseInt(container.width);
    let contHeight = parseInt(container.height);

    
    document.getElementById("map_container").scrollLeft = 0.2*svgWidth - contWidth/2;
    document.getElementById("map_container").scrollTop = 0.4*svgHeight - contHeight/2;

    localStorage['map_focus'] = "USA"

};

function EuropeMap(){

    svg = document.getElementById("svgMap");
    container = document.getElementById("map_container").getBoundingClientRect()

    let svgWidth = parseInt(svg.getAttribute('width'));
    let svgHeight = parseInt(svg.getAttribute('height'));
    let contWidth = parseInt(container.width);
    let contHeight = parseInt(container.height);

    
    document.getElementById("map_container").scrollLeft = 0.47*svgWidth - contWidth/2;
    document.getElementById("map_container").scrollTop = 0.345*svgHeight - contHeight/2;

    localStorage['map_focus'] = "Europe"

};

function elemHighlight(elem_hovered){
    var elem = document.getElementsByClassName('map_elem')
    for (let i = 0; i < elem.length; i++) {
        elem[i].style.fill = "gray"
    } 
    elem_hovered.style.fill = "red"
    elem_hovered.style.filter= "dropshadow(-1px -1px 10px #3e68ff)"

}  

async function setMap(){

    var elem = document.getElementsByClassName('map_elem')
    for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener("mouseover", function(){
            document.getElementById('legend-text').innerHTML = elem[i].id;
            fetch("map_places/"+elem[i].id+".html")
            .then(response=> response.text())
            .then(text=>  document.getElementById('legend-text').innerHTML = text)
            .then(elemHighlight(elem[i]))
            
        });
    
    } 


      document.getElementById('LK').addEventListener("click", (event) => {
        var elem = document.getElementsByClassName('visitedland')
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.fill = "#b65dfa";
        }
      });

}  

function NextMap(){
    var elem = document.getElementsByClassName('map_elem')
    id = localStorage['last_com']

    localStorage['last_com'] =  Number(id)+1

    if (localStorage['last_com']>elem.length){
        localStorage['last_com']=0
    }

    if (elem[id].id == "santabarbra" || elem[id].id == "losangeles"){
        USAMap();
    }
    else{
        EuropeMap();
    }
    fetch("map_places/"+elem[id].id+".html")
    .then(response=> response.text())
    .then(text=>  document.getElementById('legend-text').innerHTML = text)
    .then(elemHighlight(elem[id]))


};

function ResetLegend(){

    fetch("map_places/default.html")
    .then(response=> response.text())
    .then(text=>  document.getElementById('legend-text').innerHTML = text);

    var elem = document.getElementsByClassName('map_elem')
    for (let i = 0; i < elem.length; i++) {
        elem[i].style.fill = "#b65dfa"
    } 
};


function setHeight() {

    if (document.getElementById('head-band').getBoundingClientRect().width < 600){
        document.getElementById('map_container').style.width = "100%";
        document.getElementById('legend').style.width = "100%";
        document.getElementById('map_container').style.height = "50vh";
        document.getElementById('legend').style.height = "fit-content";

    }
    else{
        document.getElementById('map_container').style.width = "75%";
        document.getElementById('legend').style.width = "25%";
        document.getElementById('map_container').style.height = "70vh";
        document.getElementById('legend').style.height = "70vh";
        document.getElementById('legend').style.overflowY = "scroll";


        }

}

window.addEventListener('resize', setHeight);



  