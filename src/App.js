
import './App.css';
import useWebAnimations from "@wellyshen/use-web-animations"
import {useEffect} from 'react'

function App() {

  // const {ref,playState} = useWebAnimations({...backInLeft})
  var redQueen_playbackRate = 1;
  var background_playbackRate = 1;

/* Background animations */
const sceneryFrames =   [
  { transform: 'translateX(100%)' },
  { transform: 'translateX(-100%)' }   
];

const sceneryTimingBackground = {
  duration: 36000,
  playbackRate: background_playbackRate,
  iterations: Infinity,
  
};

const sceneryTimingForeground = {
  duration: 12000,
  playbackRate: background_playbackRate,
  iterations: Infinity,
};

const background1 = useWebAnimations({
  keyframes:sceneryFrames,
  timing:sceneryTimingBackground});



const background2 = useWebAnimations({
  keyframes:sceneryFrames,
  timing:sceneryTimingBackground});

const  foreground1 = useWebAnimations({
  keyframes:sceneryFrames,
  timing:sceneryTimingForeground});
 
  const foreground2 = useWebAnimations({
  keyframes:sceneryFrames,
  timing:sceneryTimingForeground});





const spriteFrames = [
  { transform: 'translateY(0)' },
  { transform: 'translateY(-100%)' }   
];

const redQueen_alice = useWebAnimations({
keyframes:spriteFrames, 
timing:{
  easing: 'steps(7, end)',
  direction: "reverse",
  duration: 600,
  playbackRate: redQueen_playbackRate,
  iterations: Infinity
}});



/* Alice tires so easily! 
  Every so many seconds, reduce their playback rate so they slow a little. 
*/



const adjustBackgroundPlayback = ()=> {
  if (redQueen_playbackRate  < .8) {
  background_playbackRate  = (redQueen_playbackRate /2) *-1
  } else if (redQueen_playbackRate > 1.2) {
  background_playbackRate  = redQueen_playbackRate /2
  } else {
    background_playbackRate = 0;
  } 
background1.getAnimation().playbackRate = background_playbackRate
background2.getAnimation().playbackRate = background_playbackRate
foreground1.getAnimation().playbackRate = background_playbackRate
foreground2.getAnimation().playbackRate = background_playbackRate

}




/* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
/* But if they fall under 1, the background slides backwards */

const goFaster = ()=> {
  /* But you can speed them up by giving the screen a click or a tap. */
  redQueen_playbackRate*= 1.1;
  redQueen_alice.getAnimation().playbackRate = redQueen_playbackRate; 
  adjustBackgroundPlayback();
  // adjustBackgroundPlayback();
}




useEffect(() => {


const bg  = background1.getAnimation();
const fg = foreground1.getAnimation();
fg.currentTime = fg.effect.getTiming().duration / 2;
bg.currentTime = bg.effect.getTiming().duration / 2;

setInterval( ()=> {
  /* Set delay */
  if (redQueen_playbackRate > .4) {
    redQueen_playbackRate *= .9;
    redQueen_alice.getAnimation().playbackRate = redQueen_playbackRate;  
  } 
  adjustBackgroundPlayback();
}, 2000);
  

document.addEventListener("click", goFaster);

})










  return (
<div className="wrapper">
  <div className="sky"></div>
  <div className="earth">
    <div   id="red-queen_and_alice" >
      <img ref={redQueen_alice.ref} id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." />
    </div>
  </div>

  <div className="scenery" id="foreground1" ref={foreground1.ref}>
    <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" "/>
  </div>
  <div className="scenery" id="foreground2" ref={foreground2.ref}>    
    <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" "/>
    <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" "/>
  </div>
  <div className="scenery" id="background1" ref={background1.ref}>
    <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" "/>
    <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" "/>
    <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" "/>
  </div>
  <div className="scenery" id="background2" ref = {background2.ref}>
    <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" "/>

    <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" "/>
    <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" "/>
  </div>
</div>
  );
}

export default App;
