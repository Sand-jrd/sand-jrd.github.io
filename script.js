
function gotopage(link) {
    window.location.href = window.location.origin+"?page="+link;
}

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
                    
                    if (info == "abstract"){ 
                        var span = document.createElement("spam");
                        span.classList.add("tooltiptext")    
                        span.appendChild(document.createTextNode(json[i]["doctype"]));
                        publication_i.appendChild(span); }

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

    var url = window.location.href;
    if (url.includes('page=')==false){
        var link = localStorage['last_page'] || 'into';
        window.location.href = window.location.origin+"?page="+link;
    }

    var link = url.substring(5+url.indexOf('page='))
    gotosec(link)

    if (link == "publi"){
        loadpub();
        autoScroll();
    }
    if (link == "into"){
        add_markdown ()
    }

    if (link == "com"){
        setMap()
        HomeMap()
        setHeight() 
        window.addEventListener("resize", setHeight);
    }
    if (link == "proj"){
        autoScroll();
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
        loadpub();
        autoScroll();
    }
    if (link == "into"){
        add_markdown ()
    }

    if (link == "com"){
        setMap()
        HomeMap()
        setHeight() 
        window.addEventListener("resize", setHeight);
    }
    if (link == "proj"){
        autoScroll();
    }


    localStorage['last_page'] = link

}

// -------- Srcoll of images --------

var scrollHandler = null;
function autoScroll () {
    localStorage['image_isover'] = false
    if (scrollHandler!= null){clearInterval(scrollHandler);}
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

            document.getElementById("public").addEventListener("mouseenter", async function(){
                clearInterval(scrollHandler);
            document.getElementById("public").addEventListener("mouseleave", async function(){
                autoScroll();
            });
            })

        }
        
    },0.001);


};

 
function add_markdown () {
    const converter = new showdown.Converter(); 
    fetch("greeds.md")
    .then(response=> response.text())
    .then(text=> document.getElementById("markdown-output").innerHTML = converter.makeHtml(text));
};
 
function copypipinstall ()  {
    navigator.clipboard.writeText("pip install GreeDS");
    document.getElementById("cp-pip").src = "../done.png"
    setTimeout(() => {
        document.getElementById("cp-pip").src = "../cp.png"
    }, 1000);
};

function copyimport ()  {
    navigator.clipboard.writeText("from  GreeDS import  GreeDS\nfrom  vip_hci.fits import  open_fits\ncube = open_fits( 'your_cube.fits')\nangles = open_fits( 'your_PA_angles.fits')\nref = open_fits( 'your_refs.fits')");
    document.getElementById("cp-import").src = "../done.png"
    setTimeout(() => {
        document.getElementById("cp-import").src = "../cp.png"
    }, 1000);
};

function copygreeds ()  {
    navigator.clipboard.writeText("r = 10 # Iteration over PCA-rank\nl = 10 # Iteration per rank\nr_start = 1 # PCA-rank to start iteration (good for faint signals)\npup_size = 3 # Radius of numerical mask to hide coro\nres = GreeDS(cube, angles, r=r, l=l, r_start=r_start, pup_size=pup_size)");
    document.getElementById("cp-greeds").src = "../done.png"
    setTimeout(() => {
        document.getElementById("cp-greeds").src = "../cp.png"
    }, 1000);
};


function zoomMap(scalestr){

    scale = parseFloat(scalestr)
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

    
    document.getElementById("map_container").scrollLeft = 0.135*svgWidth - contWidth/2;
    document.getElementById("map_container").scrollTop = 0.38*svgHeight - contHeight/2;

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

var isTouchPad = false; // Assume by default that it is mousePad
var wheelevent = false; // Assume by default that it is mousePad
var intervalleft = null;
var intervalright = null;
var intervalup = null;
var intervaldown = null;

async function setMap(){
    
    var elem = document.getElementsByClassName('map_elem')
    for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener("mouseover", async function(){
           
            if(document.getElementById('legend-text').innerHTML.includes(elem[i].id) == false){
                document.getElementById('legend-text').style.opacity = 0
                document.getElementById('legend-text').innerHTML = elem[i].id
                op = 0.005
                clearInterval(localStorage["current-map-timer"])
                localStorage["current-map-timer"] = ele_map_timer = setInterval(async function () {
                    if (op == 1){ clearInterval(ele_map_timer); }
                    document.getElementById('legend-text').style.opacity = op;
                    op += op + 0.000005;
                }, 20);

                await fetch("map_places/"+elem[i].id+".html")
                .then(response=> response.text())
                .then(text=>  document.getElementById('legend-text').innerHTML = text)
                .then(elemHighlight(elem[i]))  
            }

        });
        elem[i].addEventListener("click", async function(){
    
            if(document.getElementById('legend-text').innerHTML.includes(elem[i].id) == false){
                document.getElementById('legend-text').style.opacity = 0
                document.getElementById('legend-text').innerHTML = elem[i].id
                op = 0.005
                clearInterval(localStorage["current-map-timer"])
                localStorage["current-map-timer"] = ele_map_timer = setInterval(async function () {
                    if (op == 1){ clearInterval(ele_map_timer); }
                    document.getElementById('legend-text').style.opacity = op;
                    op += op + 0.000005;
                }, 70);

                await fetch("map_places/"+elem[i].id+".html")
                .then(response=> response.text())
                .then(text=>  document.getElementById('legend-text').innerHTML = text)
                .then(elemHighlight(elem[i]))  
            }

            
        });
    }
        
    wheelevent = document.getElementById('svgMap').addEventListener("mousewheel", async function(e){ 
        
        isTouchPad = e.wheelDeltaY ? e.wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0
        
        if (isTouchPad==false){
                document.getElementById('map_container').style["overflow-y"] = "hidden";
                document.getElementById('map_container').style["overflow-x"] = "hidden";
                zoomMap(e.deltaY)
            }
        else{
            document.getElementById('map_container').style["overflow-y"] = "scroll";
            document.getElementById('map_container').style["overflow-x"] = "scroll";
        }
        });

        document.getElementById('arrow-right').addEventListener("mouseover", async function(e){
            change_botton_visibility(true)
            clearInterval(intervalright)
            intervalright = setInterval(async function () {
                document.getElementById("map_container").scrollLeft = document.getElementById("map_container").scrollLeft +1;
            }, 5); });
        document.getElementById('arrow-right').addEventListener("mouseleave", async function(){
            clearInterval(intervalright)
            change_botton_visibility(false)
        })    

        document.getElementById('arrow-left').addEventListener("mouseover", async function(e){
            clearInterval(intervalleft)
            change_botton_visibility(true)
            intervalleft = setInterval(async function () {
                document.getElementById("map_container").scrollLeft = document.getElementById("map_container").scrollLeft -1;
            }, 5); });
        document.getElementById('arrow-left').addEventListener("mouseleave", async function(){
            clearInterval(intervalleft)
            change_botton_visibility(false)
        })    
        document.getElementById('arrow-up').addEventListener("mouseover", async function(e){
            clearInterval(intervalup)
            change_botton_visibility(true)
            intervalup = setInterval(async function () {
                document.getElementById("map_container").scrollTop = document.getElementById("map_container").scrollTop -1;
            }, 5); });
        document.getElementById('arrow-up').addEventListener("mouseleave", async function(){
            clearInterval(intervalup)
            change_botton_visibility(false)
        })    
        document.getElementById('arrow-down').addEventListener("mouseover", async function(e){
            clearInterval(intervaldown)
            change_botton_visibility(true)
            intervaldown = setInterval(async function () {
                document.getElementById("map_container").scrollTop = document.getElementById("map_container").scrollTop +1;
            }, 5); });
        document.getElementById('arrow-down').addEventListener("mouseleave", async function(){
            clearInterval(intervaldown)
            change_botton_visibility(false)
        })    
   
        document.getElementById('svgMap').addEventListener("mouseleave", async function(){
            change_botton_visibility(false)
            clearInterval(localStorage["current-move-timer"])
        })


    document.getElementById('LK').addEventListener("click", (event) => {
        var elem = document.getElementsByClassName('visitedland')
        for (let i = 0; i < elem.length; i++) {
            elem[i].style.fill = "#b65dfa";
        }
      });

}  

function NextMap(){

    svg = document.getElementById("svgMap");
    container = document.getElementById("map_container").getBoundingClientRect()
    svg.setAttribute('height', `${(4057*1.5)}`);
    svg.setAttribute('width', `${(5000*1.5)}`);

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
    document.getElementById('legend-text').style.opacity = 0
    op = 0.005
    clearInterval(localStorage["current-map-timer"])
    localStorage["current-map-timer"] = ele_map_timer = setInterval(async function () {
        if (op == 1){ clearInterval(ele_map_timer); }
        document.getElementById('legend-text').style.opacity = op;
        op += op + 0.000005;
    }, 70);


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

    var position = document.getElementById('map_container').getBoundingClientRect();

    var x = position.left;
    var y = position.top;
    var height = position.height;
    var width = position.width;
    document.getElementById('arrow-left').style.height=(height).toString()+"px"
    document.getElementById('arrow-left').style.top=(y).toString()+"px"
    document.getElementById('arrow-left').style.left=(x).toString()+"px"
    document.getElementById('arrow-right').style.height=(height).toString()+"px"
    document.getElementById('arrow-right').style.top=(y).toString()+"px"
    document.getElementById('arrow-right').style.left=(x+width-30).toString()+"px"
    document.getElementById('arrow-up').style.top=(y).toString()+"px"
    document.getElementById('arrow-up').style.left=(x).toString()+"px"
    document.getElementById('arrow-up').style.width=(width).toString()+"px"

    document.getElementById('arrow-down').style.top=(y+height-31).toString()+"px"
    document.getElementById('arrow-down').style.left=(x).toString()+"px"
    document.getElementById('arrow-down').style.width=(width).toString()+"px"


}

window.addEventListener('resize', setHeight);



function change_botton_visibility(active){
    if(active==true){
        opacity = 0.5
        zindex= 5;
    }else{
        opacity = 0
        zindex= 0;
    }
    var elem = document.getElementsByClassName('move_botton')
    for (let i = 0; i < elem.length; i++) {
        elem[i].style.opacity = opacity;
        elem[i].style["z-index"] = zindex;

    } 

}

var rat_speed = 1
var gameover = true;

function move_rat(){

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        if (document.getElementById('textloose').style.opacity==1){ return; }
        else{

            ratdoodle = document.getElementById('ratdoodle')
            var xforms = ratdoodle.getAttribute('transform');
            var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
            var firstX = parts[1];
            var firstY = parts[2];
            var scale = /scale\(\s*([^\s,)]+)\)/.exec(xforms);
            var scaleint = parseFloat(scale[1])
            switch (event.key) {
            case "ArrowDown":
                var newY = (parseFloat(firstY) + 10*rat_speed).toString();
                if (parseFloat(firstY) + 30 <= 867-20*scaleint){
                    ratdoodle.setAttribute('transform','translate('+firstX+','+newY+') '+scale[0]);
                    isFromge()
                }
                break;
            case "ArrowUp":
                var newY = (parseFloat(firstY) - 10*rat_speed).toString();
                if (parseFloat(firstY) - 30 >= 0){
                    ratdoodle.setAttribute('transform','translate('+firstX+','+newY+') '+scale[0]);
                    isFromge()
                }
                break;
            case "ArrowLeft":
                var newX = (parseFloat(firstX) - 10*rat_speed).toString();
                if (parseFloat(firstX) - 30  >= 0){
                    ratdoodle.setAttribute('transform','translate('+newX+','+firstY+') '+scale[0]);
                    isFromge()
                }
                break;
            case "ArrowRight":
                var newX = (parseFloat(firstX) + 10*rat_speed).toString();
                if (parseFloat(firstX) + 30  <= 1800-50*scaleint){
                    ratdoodle.setAttribute('transform','translate('+newX+','+firstY+') '+scale[0]);
                    isFromge()
                }
                break;
            default:
                return; // Quit when this doesn't handle the key event.
            }
        }
        event.preventDefault();
    }, true);
    
}


function isFromge(){

    ratdoodle = document.getElementById('ratdoodle')
    var xforms = ratdoodle.getAttribute('transform');
    var Ratpos  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
    var ratX = parseFloat(Ratpos[1]);
    var ratY = parseFloat(Ratpos[2]);
    var scale = /scale\(\s*([^\s,)]+)\)/.exec(xforms);
    var donaSize = parseFloat(scale[1])

    fromage = document.getElementById('Fromage')
    var xforms = fromage.getAttribute('transform');
    var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
    var cheeseX = parseFloat(parts[1]);
    var cheeseY = parseFloat(parts[2]);
    var scaleFromage = /scale\(\s*([^\s,)]+)\)/.exec(xforms);

    if(cheeseX-50*donaSize <  ratX && cheeseX+50*donaSize > ratX
        && cheeseY-50*donaSize < ratY && cheeseY+50*donaSize > ratY){
            alert(donaSize)
            if (donaSize+0.2 < 2.2){ 
            
                ratdoodle.setAttribute('transform',Ratpos[0]+') scale('+(donaSize+0.2).toString()+')');
    
                var newX = (Math.floor(Math.random() * 1700)).toString();
                var newY = (Math.floor(Math.random() * 800)).toString();
                fromage.setAttribute('transform','translate('+newX+','+newY+') '+scaleFromage[0]);
                rat_speed = rat_speed+0.3
            } 
            else{
                gameover = true;
                document.getElementById('ratdoodle').setAttribute('transform','translate(400 200) scale(8)');
                document.getElementById('Fromage').setAttribute('transform','translate(200 100) scale(5)');
                document.getElementById('textaward').setAttribute('transform','translate(20 40)');
                document.getElementById('heartaward').setAttribute('transform','translate(20 40)');
                document.getElementById('Award').style.opacity=1;
            }

    }


}

async function gameStart(){
    var divout = document.getElementById('gamecanbehere')

    await fetch("pages/gameRat.html")
    .then(response=> response.text())
    .then(text=> divout.innerHTML = text)
    .then(move_rat())
    .then(meanRatMove());

}

function eatTheMouse(){
   
    var xforms = document.getElementById('badrat').getAttribute('transform');
    var Ratpos  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
    var BADratX = parseFloat(Ratpos[1]);
    var BADratY = parseFloat(Ratpos[2]);

    var xforms = document.getElementById('ratdoodle').getAttribute('transform');
    var Ratpos  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
    var ratX = parseFloat(Ratpos[1]);
    var ratY = parseFloat(Ratpos[2]);
    var scale = /scale\(\s*([^\s,)]+)\)/.exec(xforms);
    var scaleint = parseFloat(scale[1])

    return (BADratX-50*scaleint <  ratX && BADratX+50*scaleint > ratX
        && BADratY-50*scaleint < ratY && BADratY+50*scaleint > ratY)
}
    

function meanRatMove(){

    bad_rat_move = setInterval(async function () {

        if (document.getElementById('Award').style.opacity==0){
            if (eatTheMouse()==true){
                badratdoodle = document.getElementById('badrat')
                badratdoodle.setAttribute('transform','translate(500 200)  scale(8)');
                document.getElementById('textloose').style.opacity=1;
                clearInterval(bad_rat_move);
            }
            else{
                badratdoodle = document.getElementById('badrat')
                var xforms = badratdoodle.getAttribute('transform');
                var Ratpos  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
                var ratX = parseFloat(Ratpos[1]);
                var ratY = parseFloat(Ratpos[2]);
                var newX = (parseFloat(ratX) +1).toString();
                var newY = (parseFloat(ratY)).toString();

                if (parseFloat(ratX) - rat_speed  <= 0){
                    var newY = (Math.floor(Math.random() * 750)).toString();
                    var newX = (1800).toString();

                }else{
                    var newX = (parseFloat(ratX) -rat_speed).toString();
                }
                badratdoodle.setAttribute('transform','translate('+newX+','+newY+')  scale(2)');

            }
        }else{
            badratdoodle = document.getElementById('badrat').style.opacity=0;
            badratdoodle = document.getElementById('Fromage').style.opacity=0;
            clearInterval(bad_rat_move);}
    }, 1);

}

