import { useEffect,useState } from 'react';
import "./animation.css"
const INITIAL_PAUSE_DURATION = 5000.00;     // Time before animation starts (ms)
const ANIMATION_CYCLE_DURATION = 3000.00;   // Duration to toggle animation on/off (ms)
function UseAnimationToggle() {
  const [animationsPaused, setAnimationsPaused] = useState(true);
  useEffect(() => {
    let initialPauseTimeout;
    let animationCycleInterval;

    const initializeAnimation = () => {
      // Start with initial pause duration
      initialPauseTimeout = setTimeout(() => {
        setAnimationsPaused(false);  // Start animation

        // Begin regular on/off cycle
        animationCycleInterval = setInterval(() => {
          setAnimationsPaused(prev => !prev);  // Toggle animation state consistently
        }, ANIMATION_CYCLE_DURATION);
      }, INITIAL_PAUSE_DURATION);
    };

    initializeAnimation();

    // Cleanup timeouts and intervals on component unmount
    return () => {
      clearTimeout(initialPauseTimeout);
      clearInterval(animationCycleInterval);
    };
  }, [animationsPaused, setAnimationsPaused]);

  return (
    <div className='animationDiv'>
       <div class="trafficlight">
        <div class="red"></div>
        <div class="yellow"></div>
        <div class="green"></div>
      </div> 

       <div className={`cloudanimation ${animationsPaused ? 'paused' : ''}`}>
        <div className='cloud1'></div>
        <div className='cloud2'></div>
        <div className='cloud3'></div>
        <div className='cloud4'></div>
      </div>

      <div className='cityAnimation'>
        <div className={`city1 ${animationsPaused ? 'paused' : ''}`}></div>
        <div className={`city2 ${animationsPaused ? 'paused' : ''}`}></div>
      </div>
    </div>
      
  )
}

export default UseAnimationToggle;
