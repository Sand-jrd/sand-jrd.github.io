
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
    localStorage['last_work'] = 0


});


// -------- Nav bar --------

$(document).ready(function() {

const button = document.getElementById('currentpage');

    var url = window.location.href;
    if (url.includes('page=')==false){
        var link = 'into';
        window.location.href = window.location.origin+"?page="+link;
    }

    var link = url.substring(5+url.indexOf('page='))
    gotosec(link)

    if (link == "publi"){
        loadpub();
        autoScroll();
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

    var elem = ["bruxelles","leiden","nice","frejus","garching","leuven","luxembourg","garching","losangeles","santabarbra","leuven"].reverse()//document.getElementsByClassName('map_elem')
    id = localStorage['last_com'] || 0

    localStorage['last_com'] =  Number(id)+1

    if (localStorage['last_com']>=elem.length){
        localStorage['last_com']=0
    }

    if (elem[id] == "santabarbra" || elem[id] == "losangeles"){
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

    document.getElementById('nextmap').value = "Next conf. "+( parseFloat(id)+1).toString()+"/"+(elem.length).toString()
    fetch("map_places/"+elem[id]+".html")
    .then(response=> response.text())
    .then(text=>  document.getElementById('legend-text').innerHTML = text)
    .then(elemHighlight(document.getElementById(elem[id])))


};

var workList = document.getElementsByClassName('map_elem')

function NextMapWork(){

    svg = document.getElementById("svgMap");
    container = document.getElementById("map_container").getBoundingClientRect()
    svg.setAttribute('height', `${(4057*1.5)}`);
    svg.setAttribute('width', `${(5000*1.5)}`);

    var elem = ["angers","brest","bordeaux","paris","liege"].reverse()//document.getElementsByClassName('map_elem')
    id = localStorage['last_work'] || 0

    localStorage['last_work'] =  Number(id)+1

    if (localStorage['last_work']>=elem.length){
        localStorage['last_work']=0
    }

    if (elem[id] == "santabarbra" || elem[id] == "losangeles"){
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

    document.getElementById('nextmapwork').value = "Next Work/Education "+( parseFloat(id)+1).toString()+"/"+(elem.length).toString()
    fetch("map_places/"+elem[id]+".html")
    .then(response=> response.text())
    .then(text=>  document.getElementById('legend-text').innerHTML = text)
    .then(elemHighlight(document.getElementById(elem[id])))

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




var rat_speed = 3
var gameover = true;
var d1= "m1.02277,26.50293c0,0 -1.5634,-2.22473 0.62535,-3.19199c2.18875,-0.96724 9.38033,-9.72102 15.00849,-9.86611c0,0 0.31267,-8.70538 4.37747,-7.2545c4.06483,1.45092 2.18875,2.61161 2.18875,2.61161c0,0 6.8789,-7.54466 8.75498,0.87054c0,0 1.87605,2.17636 9.06762,-4.0625c7.19157,-6.23886 31.87538,-7.72169 43.77482,3.77234c7.66057,7.39959 18.29159,18.42643 10.00564,28.43763c0,0 4.79652,21.99093 -35.2816,18.68855c0,0 -15.52844,-2.72867 -23.50168,-2.43848c-7.97327,0.29016 -14.5395,2.75671 -10.63102,-0.58038c3.90844,-3.33706 14.38315,-3.33706 28.45362,-0.87054c14.07047,2.46655 36.58321,2.03127 36.58321,-12.76791c0,0 -3.43945,1.16073 -5.00282,0.29019c0,0 0.78167,3.19196 -3.75212,2.9018c-4.53383,-0.29019 -0.4981,2.46693 -5.18824,4.35307c0,0 -1.40705,0.87057 -1.87608,0c0,0 -2.34507,0 -1.56337,-0.87054c0,0 -1.32887,-0.50782 0,-1.45089c1.32887,-0.94307 2.37414,-4.86092 2.06147,-4.93345c-0.31267,-0.07253 0.15632,-0.94307 -0.62535,-0.87054c-0.7817,0.07253 -23.91982,1.37835 -30.01702,-0.29019c0,0 -0.31267,1.95873 -1.56337,1.16073c0,0 5.33787,3.44728 2.83648,4.68054c-2.50143,1.23329 -1.64158,0.29019 -2.50143,0.58038c-0.85988,0.29016 -1.7979,1.66851 -2.8141,0.87054c0,0 -3.43945,0.79798 -2.50143,-0.58038c0,0 -1.09434,0.36275 -1.56337,-0.58035c0,0 -1.48523,-0.43525 0.62535,-2.03127c2.11058,-1.59598 -6.27593,-3.88253 -5.65058,-4.68054c0.62538,-0.79801 0.39085,-1.37835 -1.56337,-1.16073c-1.95422,0.21763 -5.94088,-0.43525 -9.06765,-2.32143c-3.12678,-1.88617 -2.11492,-2.82408 -8.75494,-3.48218c-5.36761,-0.53198 -6.46199,-1.25743 -7.81692,-1.74108c-1.35497,-0.48362 -3.12678,-3.19196 -3.12678,-3.19196l-0.00001,0.00002z"
var d2 ="m1.15383,26.50293c0,0 -1.5634,-2.22473 0.62535,-3.19199c2.18875,-0.96724 9.38033,-9.72102 15.00849,-9.86611c0,0 0.31267,-8.70538 4.37747,-7.2545c4.06483,1.45092 2.18875,2.61161 2.18875,2.61161c0,0 6.8789,-7.54466 8.75498,0.87054c0,0 1.87605,2.17636 9.06762,-4.0625c7.19157,-6.23886 31.87538,-7.72169 43.77482,3.77234c7.66057,7.39959 18.29159,18.42643 10.00564,28.43763c0,0 4.79652,21.99093 -35.2816,18.68855c0,0 -15.52844,-2.72867 -23.50168,-2.43848c-7.97327,0.29016 -14.5395,2.75671 -10.63102,-0.58038c3.90844,-3.33706 14.38315,-3.33706 28.45362,-0.87054c14.07047,2.46655 36.58321,2.03127 36.58321,-12.76791c0,0 -3.43945,1.16073 -5.00282,0.29019c0,0 0.78167,3.19196 -3.75212,2.9018c-4.53383,-0.29019 -8.75498,-1.59598 -13.44512,0.29016c0,0 -1.40705,0.87057 -1.87608,0c0,0 -2.34507,0 -1.56337,-0.87054c0,0 -1.32887,-0.50782 0,-1.45089c1.32887,-0.94307 10.63102,-0.79801 10.31835,-0.87054c-0.31267,-0.07253 0.15632,-0.94307 -0.62535,-0.87054c-0.7817,0.07253 -23.91982,1.37835 -30.01702,-0.29019c0,0 -0.31267,1.95873 -1.56337,1.16073c0,0 -11.56908,1.08817 -14.07047,2.32143c-2.50143,1.23329 -1.64158,0.29019 -2.50143,0.58038c-0.85988,0.29016 -1.7979,1.66851 -2.8141,0.87054c0,0 -3.43945,0.79798 -2.50143,-0.58038c0,0 -1.09434,0.36275 -1.56337,-0.58035c0,0 -1.48523,-0.43525 0.62535,-2.03127c2.11058,-1.59598 10.63102,-1.52342 11.25637,-2.32143c0.62538,-0.79801 0.39085,-1.37835 -1.56337,-1.16073c-1.95422,0.21763 -5.94088,-0.43525 -9.06765,-2.32143c-3.12678,-1.88617 -2.11492,-2.82408 -8.75494,-3.48218c-5.36761,-0.53198 -6.46199,-1.25743 -7.81692,-1.74108c-1.35497,-0.48362 -3.12678,-3.19196 -3.12678,-3.19196z"
var audio = null; 
var rat_speed_normalize = 1.41

var rat_goes_up = null;
var rat_goes_down = null;
var rat_goes_left = null;
var rat_goes_right = null;

var game_mod =null;
game_is_running = false

var  rat_walk = null;
function ratwalk(doTheWalk){

    if (doTheWalk){
    rat_walk = setInterval(function(){
        if (document.getElementById('ratbody').getAttribute('d')==d2){
            document.getElementById('ratbody').setAttribute('d',d1)
        }else{document.getElementById('ratbody').setAttribute('d',d2)}
    }, 100);
    }else{
        clearInterval(rat_walk)
        rat_walk=null;
    }
        
}

var block_y=false;
function block_rat_in_y(block_or_not){
    block_y=block_or_not;
    return;
}

function move_rat(event){

        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
        if (document.getElementById('textloose').style.opacity==1){ return; }
        else{    
            switch (event.key) {
            case "ArrowDown":
                if (rat_goes_down==null && block_y==false){    
                rat_goes_down = setInterval(function(){
                    
                    ratdoodle = document.getElementById('ratdoodle')
                    var xforms = ratdoodle.getAttribute('transform');
                    var parts  =/matrix\(\s*([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
                    var firstX = parts[5];
                    var firstY = parts[6];
                    var scaleint = parseFloat(parts[4])

                    var newY = (parseFloat(firstY) + 3*rat_speed_normalize).toString();
                    if (parseFloat(firstY) + 30 <= 867-10*scaleint){
                        ratdoodle.setAttribute('transform','matrix('+parts[1]+",0,0,"+parts[4]+','+firstX+','+newY+')');
                        isFromge()
                    }
                }, 20);}
                break;
            case "ArrowUp":
                if (rat_goes_up==null && block_y==false){
                rat_goes_up = setInterval(function(){
                    ratdoodle = document.getElementById('ratdoodle')
                    var xforms = ratdoodle.getAttribute('transform');
                    var parts  =/matrix\(\s*([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
                    var firstX = parts[5];
                    var firstY = parts[6];
                
                    var newY = (parseFloat(firstY) - 3*rat_speed_normalize).toString();
                    if (parseFloat(firstY) - 30 >= 0){
                        ratdoodle.setAttribute('transform','matrix('+parts[1]+",0,0,"+parts[4]+','+firstX+','+newY+')');
                        isFromge()
                        }
                }, 20);}
                break;
            case "ArrowLeft":
                if (rat_goes_left==null){
                rat_goes_left = setInterval(function(){
                    ratdoodle = document.getElementById('ratdoodle')
                    var xforms = ratdoodle.getAttribute('transform');
                    var parts  =/matrix\(\s*([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
                    var firstX = parts[5];
                    var firstY = parts[6];
                    var scaleint = parseFloat(parts[4])
                
                    var newX = (parseFloat(firstX) - 3*rat_speed_normalize).toString();
                    if (parseFloat(firstX) - 30  >= 0){
                        if(parseFloat(parts[1])<0){(newX=parseFloat(newX)-60*scaleint).toString()}
                        ratdoodle.setAttribute('transform','matrix('+(scaleint).toString()+",0,0,"+parts[4]+','+newX+','+firstY+')');

                        isFromge()
                    }
                }, 20);}
                break;
            case "ArrowRight":
                if (rat_goes_right==null){
                rat_goes_right = setInterval(function(){
                    ratdoodle = document.getElementById('ratdoodle')
                    var xforms = ratdoodle.getAttribute('transform');
                    var parts  =/matrix\(\s*([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
                    var firstX = parts[5];
                    var firstY = parts[6];
                    var scaleint = parseFloat(parts[4])
                
                    var newX = (parseFloat(firstX) + 3*rat_speed_normalize).toString();
                    if (parseFloat(firstX) + 30  <= 1800-30*scaleint){
                        if(parseFloat(parts[1])>0){(newX=parseFloat(newX)+60*scaleint).toString()}
                        ratdoodle.setAttribute('transform','matrix('+(-scaleint).toString()+",0,0,"+parts[4]+','+newX+','+firstY+')');

                        isFromge()
                    }
                }, 20);}
                break;
            default:
                return; // Quit when this doesn't handle the key event.
            }
            if (rat_walk==null){ratwalk(true)}
            isStillWalking = 1*rat_goes_right!=null + 1*rat_goes_left!=null + 1*rat_goes_up!=null + 1*rat_goes_down!=null
            how_much = (rat_goes_right!=null || rat_goes_left!=null) && (rat_goes_up!=null || rat_goes_down!=null)
            rat_speed_normalize=1.41-0.41*(how_much)
            }

        event.preventDefault();
}

function rat_stop_moving(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "ArrowDown":
            clearInterval(rat_goes_down)
            rat_goes_down=null;
            break;
        case "ArrowUp":
            clearInterval(rat_goes_up)
            rat_goes_up=null;
            break;
        case "ArrowLeft":
            clearInterval(rat_goes_left)
            rat_goes_left=null;        
            break;
        case "ArrowRight":
            clearInterval(rat_goes_right)
            rat_goes_right=null;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    isStillWalking = rat_goes_right!=null || rat_goes_left!=null || rat_goes_up!=null || rat_goes_down!=null
    if(isStillWalking==false){ratwalk(isStillWalking)}
    how_much = (rat_goes_right!=null || rat_goes_left!=null) && (rat_goes_up!=null || rat_goes_down!=null)
    rat_speed_normalize=1.41-0.41*(how_much)
    event.preventDefault(); 
}

    

function isFromge(){

    if(block_y==true){return;}

    ratdoodle = document.getElementById('ratdoodle')
    var xforms = ratdoodle.getAttribute('transform');
    var Ratpos  = /matrix\(\s*([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
    var donaSize = parseFloat(Ratpos[4])
    var signDona = parseFloat(Ratpos[1])/donaSize

    fromage = document.getElementById('Fromage')
    var xforms = fromage.getAttribute('transform');
    var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
    var scaleFromage = /scale\(\s*([^\s,)]+)\)/.exec(xforms);

    var cheese_pos = document.getElementById('Fromage').getBoundingClientRect()
    var goodrat_pos = document.getElementById('ratdoodle').getBoundingClientRect()

    if(goodrat_pos.top < cheese_pos.top+cheese_pos.height && goodrat_pos.top > cheese_pos.top-goodrat_pos.height
        && goodrat_pos.left < cheese_pos.width+cheese_pos.left && goodrat_pos.x > cheese_pos.left-goodrat_pos.width){
            if (donaSize+0.5 < 3){ 
            
                ratdoodle.setAttribute('transform','matrix('+(signDona*(donaSize+0.5)).toString()+",0,0,"+(donaSize+0.5).toString()+','+Ratpos[5]+','+Ratpos[6]+')');
                var newX = (30+Math.floor(Math.random() * 1700)).toString();
                var newY = (30+Math.floor(Math.random() * 800)).toString();
                fromage.setAttribute('transform','translate('+newX+','+newY+') '+scaleFromage[0]);
                rat_speed = rat_speed+0.3
            } 
            else{
                if(document.getElementById('ratstaler').style.opacity==0){
                    gameover = true;
                    document.getElementById('Fromage').setAttribute('transform','translate(-1000 -100) scale(0)');
                    document.getElementById('badrat').style.opacity=0;
                    document.getElementById('Fromage').style.opacity=0;
                    clearInterval(bad_rat_move);    
                    game_mod.start_outro_screen()
                }
            }

    }


}


async function gameStart(){

    if(game_is_running==false){
        game_is_running = true
        var divout = document.getElementById('gamecanbehere')
    
        let head = document.getElementsByTagName('head')[0];
        let script2 = document.createElement('script');
        script2.src = "https://unpkg.com/gsap@3/dist/MotionPathPlugin.min.js";
        script2.onload = () => 1; 
        head.append(script2);

        let script = document.createElement('script');
        script.src = "https://unpkg.co/gsap@3/dist/gsap.min.js";
        script.onload = () => 1; 
        head.append(script);

        await fetch("pages/gameRat.html")
        .then(response=> response.text())
        .then(text=> divout.innerHTML = text)

        game_mod = await import("./script_game.js")
        game_mod.start_intro_screen()
        document.getElementById('ratdoodle').style.opacity = 0;
        document.getElementById('badrat').style.opacity = 0;
        document.getElementById('Fromage').style.opacity = 0;
    }
}

function eatTheMouse(){
   
    var badrat = document.getElementById('badrat').getBoundingClientRect()
    var goodrat = document.getElementById('ratdoodle').getBoundingClientRect()

    if(goodrat!=undefined){
        return (goodrat.top < badrat.top+badrat.height && goodrat.top > badrat.top-goodrat.height
            && goodrat.left < badrat.width+badrat.left && goodrat.x > badrat.left-goodrat.width)
    }else{return false}

}
    

function meanRatMove(){

    bad_rat_move = setInterval(async function () {

        if (document.getElementById('textloose').style.opacity==1){
            badratdoodle = document.getElementById('badrat');
            badratdoodle.setAttribute('transform','translate(500 200)  scale(8)');
            audio.pause();
            clearInterval(bad_rat_move);
        }
        if (document.getElementById('Award').style.opacity==0){
            if (eatTheMouse()==true){
                audio.pause();
                audio_over = new Audio('game_over.mp3');
                audio_over.volume = 1;
                audio_over.play();        
                stalkerrat();
                document.getElementById('ratdoodle').style.opacity=0;
                document.getElementById('Fromage').style.opacity=0;    
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
                
                if (document.getElementById('badradbody').getAttribute('d')==d1){
                    document.getElementById('badradbody').setAttribute('d',d2)
                }else{document.getElementById('badradbody').setAttribute('d',d1)}
                
                if (parseFloat(ratX) - rat_speed  <= 0){

                    fromage = document.getElementById('Fromage')
                    var xforms = fromage.getAttribute('transform');
                    var parts  = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
                    var cheeseY = parseFloat(parts[2]);
    
                    var newY = (cheeseY + 200 - Math.floor(Math.random() * 400 )).toString();
                    var newX = (1800).toString();

                }else{
                    var newX = (parseFloat(ratX) -rat_speed).toString();
                }
                badratdoodle.setAttribute('transform','translate('+newX+','+newY+')  scale(2)');

            };
        }else{
            document.getElementById('badrat').style.opacity=0;
            document.getElementById('Fromage').style.opacity=0;
            clearInterval(bad_rat_move);
        }

    },1);

}

function setrainRat(){
    var containRat = document.getElementById('rainrat')
    var ori_rat = document.getElementById('originalrat')

    var newColor = ["#ffffff","#000000","#868d90","#ffffff","#868d90"]
    var newFur = ["#ffffff","#000000","#868d90","#ffffff","#ffffff"]
    var neweye = ["#ff0000","#ff0000","#000000","#ff0000","#000000"]

    for (let index = 0; index < newColor.length; index++) {
        const clone = ori_rat.cloneNode(true);
        clone.style.left = (Math.floor(Math.random() * 80)).toString()+"%"
        clone.getElementById('happyratbody').style.fill = newColor[index]
        clone.getElementById('happyrateye').style.fill = neweye[index]
        clone.getElementById('happyratbelly').style.fill = newFur[index]
        if(newColor[index]=="#000000"){
            clone.getElementById('mouth').style.stroke = "#ffffff"
        }
        containRat.appendChild(clone);
        
    }
}

function stalkerrat(){
    window.addEventListener("mousemove", function (event) {

        var ori_rat = document.getElementById('ratstaler')

        ori_rat.style.opacity=1;
        ori_rat.style.position="absolute";

        ori_rat.style.top = (event.clientY).toString()+"px"
        ori_rat.style.left = (event.clientX).toString()+"px"

    })
}

