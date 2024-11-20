var animation_step_ii=0
var dona_in_cage = null;

export function start_intro_screen(){
    window.addEventListener("keydown", close_intro_screen);
    return;
}

var move_rat_listener =null;
var stop_rat_listener=null;

function is_dona_in_the_cage(){

    var cage = document.getElementById('svg_cage').getBoundingClientRect()
    var goodrat = document.getElementById('ratdoodle').getBoundingClientRect()

    if(goodrat.left> cage.left){
        animation_step_ii+=1
        document.getElementById('badrat').style.opacity = 1;
        document.getElementById('Fromage').style.opacity = 1;
        document.getElementById('tutorial').style.opacity = 0;
        document.getElementById('leg2').style.opacity = 0;
        document.getElementById('leg1').style.opacity = 0;
        document.getElementById('ratdoodle').setAttribute('transform','matrix(-1,0,0,1,100,200)')
        document.getElementById('svg_cage').style.opacity = 0;

        block_rat_in_y(false)
        meanRatMove()
        setrainRat()     
        clearInterval(dona_in_cage)
        window.removeEventListener("keydown", close_intro_screen);

    }
    return;
}

function close_intro_screen (event) {

    switch (event.key) {
    case "Enter":
       
        switch (animation_step_ii) {
            case 0:            
                gsap.registerPlugin(MotionPathPlugin) 
                audio = new Audio('music_for_rat.mp3');
                audio.volume = 0.1;
                audio.play();        
                document.getElementById('text-intro').style.opacity = 0;
                document.getElementById('leg2').style.opacity = 1;
                document.getElementById('leg1').style.opacity = 1;
                document.getElementById('svg_cage').style.opacity = 1;
                document.getElementById('ratdoodle').style.opacity = 1;
                document.getElementById('pressenter').setAttribute('transform','translate(-100 -150) scale(2)');
                document.getElementById('ratdoodle').setAttribute('transform',"translate(-100 800) scale(-3,3)")
                gsap.to("#leg2", {
                duration: 1,
                motionPath: {
                    path: "#path_for_leg2",
                    align: "#path_for_leg2",
                    alignOrigin: [0.5, 0.5],
                },
                });
                let tl = gsap.to("#ratdoodle", {
                    duration: 2,
                    motionPath: {
                        path: "#path_for_dona",
                        autoRotate: false,
                        align: "#path_for_dona",
                        alignOrigin: [0.8,0],

                    },
                    modifiers: {
                        scaleX: -3,
                        scaleY: 3
                      }                  
                    });
                setTimeout(function(){gsap.to("#leg1", {
                    duration: 1,
                    motionPath: {
                        path: "#path_for_leg1",
                        align: "#path_for_leg1",
                        alignOrigin: [0.5, 0.5],
                    },
                });},1000)                
                setTimeout(function(){
                    if(animation_step_ii<2){
                        gsap.to("#svg_cage", {
                            duration: 1,
                            overwrite: true,
                            motionPath: {
                                path: "#path_for_cage",
                                align: "#path_for_cage",
                                alignOrigin: [0.5, 0.5],
                            },
                        });
                    }
                },1000)
                animation_step_ii+=1
            break;
            case 1:
                document.getElementById('cinematic_deco_1').style.opacity = 1;
                animation_step_ii+=1
                break;
            case 2:
                document.getElementById('human_talk').innerHTML = "This is your temporary home,";
                document.getElementById('human_talk2').innerHTML = "until an human adopt you"
                gsap.to("#svg_cage", {duration: 1, x: -1400, y: 490, scale: 1});

                animation_step_ii+=1
                break;
            case 3:
                document.getElementById('svg_cage').setAttribute('transform','matrix(1,0,0,1,-1400,490)');
                document.getElementById('human_talk').innerHTML = "You will share a cage with Spor,";
                document.getElementById('human_talk2').innerHTML = "I hope you two will get along.."
                animation_step_ii+=1
                break;
            case 4:
                dona_in_cage = setInterval(is_dona_in_the_cage,20);

                block_rat_in_y(true)
                move_rat_listener = window.addEventListener("keydown", move_rat)
                stop_rat_listener = window.addEventListener("keyup",rat_stop_moving)

                document.getElementById('cinematic_deco_1').style.opacity = 0;
                document.getElementById('tutorial').style.opacity = 1;    
                animation_step_ii+=1
                document.getElementById('stopshowing_pressEnter').style.opacity = 0;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    
        }
    default:
        return; // Quit when this doesn't handle the key event.

    }


}


export function start_outro_screen(){
    move_rat_listener = window.addEventListener("keydown", move_rat)
        
    window.removeEventListener("keydown",move_rat)   
    window.removeEventListener("keydown",rat_stop_moving)   

    animation_step_ii=0
    audio.pause();     
    document.getElementById('open_hand').style.opacity=1;

    ratdoodle = document.getElementById('ratdoodle')
    var xforms = ratdoodle.getAttribute('transform');
    var parts  =/matrix\(\s*([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
    var firstX = parts[5];
    var firstY = parts[6];
    // Hand appear
    gsap.to("#open_hand", {duration: 2, x: firstX, y:firstY-50, scale: 1});
    gsap.to("#close_hand", {duration: 2, x: firstX, y:firstY-50, scale: 1});

    
    setTimeout(function(){
        // Close Hand
        document.getElementById('open_hand').style.opacity=0;
        document.getElementById('close_hand').style.opacity=1;
        
        setTimeout(function(){
            // HAND LEAVE
            gsap.to("#close_hand", {duration: 2, x:-100, y:-100, scale: 1});
            gsap.to("#ratdoodle", {duration: 2, x:-100, y:-100});
            
            
            setTimeout(function(){
                // New scean
                document.getElementById('leg2').style.opacity = 1;
                document.getElementById('leg1').style.opacity = 1;
                document.getElementById('svg_cage').style.opacity = 1;
                gsap.killTweensOf("#ratdoodle");
                gsap.to("#ratdoodle", {duration: 0, x: 1550, y: 690, scale: (-3,0,0,-3)});

                block_rat_in_y(true)
                move_rat_listener = window.addEventListener("keydown", move_rat)
                stop_rat_listener = window.addEventListener("keyup",rat_stop_moving)

                document.getElementById('shoe1').style.fill = "#86abc7";
                document.getElementById('shoe2').style.fill = "#86abc7";

                document.getElementById('jean1').style.fill = "#5e6164 ";
                document.getElementById('jean2').style.fill = "#5e6164 ";
                document.getElementById('jean1').style.stroke = "#000000";
                document.getElementById('jean2').style.stroke = "#000000 ";

                document.getElementById('textaward').setAttribute('transform','translate(20 40)');
                document.getElementById('heartaward').setAttribute('transform','translate(20 40)');
                document.getElementById('Award').style.opacity=1;
                rainRat()
            },2100)
        },500)
    },2300)


    return;
}



function rainRat(){
    var elem = document.getElementsByClassName('happyrat')
    for (let i = 0; i < elem.length; i++) {
        setTimeout(function(){
            elem[i].style.opacity=1;
            elem[i].style.transition = "top 20s"
            elem[i].style.webkitAnimationPlayState = 'running';
            elem[i].style.top = "100%"
            elem[i].style.left = (Math.floor(Math.random() * 100)).toString()+"%"
        },400*i)
    }
}