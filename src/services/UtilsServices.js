export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function startCountdown(time) {

  let [minutes, seconds] = time.split(':').map(Number);
  if (!seconds) seconds = 0;
  let remainingSeconds = minutes * 60 + seconds;

  const countdown = setInterval(() => {

      const displayMinutes = Math.floor(remainingSeconds / 60);
      const displaySeconds = remainingSeconds % 60;

      console.log(`${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`);


      if (remainingSeconds <= 0) {
          clearInterval(countdown);
          console.log("Tempo esgotado!");
      } else {
          remainingSeconds--; 
      }
  }, 1000); 

}