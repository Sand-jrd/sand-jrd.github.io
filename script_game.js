var animation_step_ii=0
window.addEventListener("keydown", close_intro_screen);

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
                document.getElementById('ratdoodle').style.opacity = 1;
                document.getElementById('pressenter').setAttribute('transform','translate(-100 -150) scale(2)');

                gsap.to("#leg2", {
                duration: 2,
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
                    duration: 2,
                    motionPath: {
                        path: "#path_for_leg1",
                        align: "#path_for_leg1",
                        alignOrigin: [0.5, 0.5],
                    },
                });},2000)
                animation_step_ii+=1
            break;
            case 1:
                document.getElementById('cinematic_deco_1').style.opacity = 1;
                animation_step_ii+=1
                break;
            case 2:
                document.getElementById('human_talk').innerHTML = "This is your temporary home,";
                document.getElementById('human_talk2').innerHTML = "until an human adopt you"
                animation_step_ii+=1
                break;
            case 3:
                document.getElementById('human_talk').innerHTML = "You will share a cage with Spor,";
                document.getElementById('human_talk2').innerHTML = "I hope you two will get along.."
                animation_step_ii+=1
                break;
            case 4:
                document.getElementById('cinematic_deco_1').style.opacity = 0;
                document.getElementById('tutorial').style.opacity = 1;
                animation_step_ii+=1
    
            break;
            case 5:

                document.getElementById('ratdoodle').style.opacity =1;
                document.getElementById('badrat').style.opacity = 1;
                document.getElementById('Fromage').style.opacity = 1;
                document.getElementById('tutorial').style.opacity = 0;
                document.getElementById('leg2').style.opacity = 0;
                document.getElementById('leg1').style.opacity = 0;
                document.getElementById('ratdoodle').setAttribute('transform','translate(500 200)  scale(-1,1)');
                document.getElementById('stopshowing_pressEnter').style.opacity = 0;

                move_rat()
                meanRatMove()
                setrainRat()     

                window.removeEventListener("keydown", close_intro_screen);
   
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    
        }
    default:
        return; // Quit when this doesn't handle the key event.

    }


}
