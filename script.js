// Questions divided into levels
const levels = {
  Easy: [
    { q: "Can plastic bottles be recycled?", a: "Yes" },
    { q: "Can used tissue paper be recycled?", a: "No" },
    { q: "Can food waste be composted?", a: "Yes" },
    { q: "Is mixing wet and dry waste a good practice?", a: "No" },
    { q: "Can metal cans be recycled?", a: "Yes" },
    { q: "Are plastic bags recyclable everywhere?", a: "No" },
    { q: "Can cardboard be recycled?", a: "Yes" },
    { q: "Can broken glass be recycled?", a: "Yes" }
  ],
  Medium: [
    { q: "Can batteries be recycled?", a: "Yes" },
    { q: "Is e-waste harmful to the environment?", a: "Yes" },
    { q: "Can newspapers be recycled?", a: "Yes" },
    { q: "Can thermocol be recycled easily?", a: "No" },
    { q: "Is composting eco-friendly?", a: "Yes" },
    { q: "Can oily paper be recycled?", a: "No" },
    { q: "Can aluminium foil be recycled?", a: "Yes" },
    { q: "Can old clothes be recycled or reused?", a: "Yes" },
    { q: "Is plastic biodegradable?", a: "No" }
  ],
  Hard: [
    { q: "Is burning waste a good idea?", a: "No" },
    { q: "Can mobile phones be recycled?", a: "Yes" },
    { q: "Can food waste go into a dry waste bin?", a: "No" },
    { q: "Is waste segregation important?", a: "Yes" },
    { q: "Can glass bottles be reused?", a: "Yes" },
    { q: "Is recycling good for the environment?", a: "Yes" },
    { q: "Can electronic waste be thrown in dustbin?", a: "No" },
    { q: "Is proper waste management necessary?", a: "Yes" }
  ]
};

let levelNames = ["Easy","Medium","Hard"];
let currentLevel = 0;
let index = 0;
let score = 0;
let timeLeft = 15;
let timer;

// Color themes for each level
const levelColors = {
  Easy: "linear-gradient(270deg, #ff9a9e, #fad0c4)",
  Medium: "linear-gradient(270deg, #a1c4fd, #c2e9fb)",
  Hard: "linear-gradient(270deg, #fbc2eb, #a6c1ee)"
};

// Create beep sound
function beep(type="short"){
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const o = context.createOscillator();
  const g = context.createGain();
  o.type = "sine";
  o.connect(g);
  g.connect(context.destination);
  if(type==="correct"){
    o.frequency.value = 800;
  } else if(type==="wrong"){
    o.frequency.value = 300;
  } else if(type==="level"){
    o.frequency.value = 500;
  } else {
    o.frequency.value = 600;
  }
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.2);
  o.stop(context.currentTime + 0.2);
}

// Change background color according to level
function changeBackground(level){
  document.body.style.background = levelColors[level];
  document.body.style.backgroundSize = "400% 400%";
  document.body.style.animation = "GradientBG 20s ease infinite";
}

// Start Game
function startGame() {
  currentLevel = 0;
  score = 0;
  index = 0;
  document.getElementById("score").innerText = "Score: 0";
  document.getElementById("levelName").innerText = "Level: " + levelNames[currentLevel];
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("buttons").style.display = "block";
  document.getElementById("nextLevelBtn").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("result").innerText = "";

  changeBackground(levelNames[currentLevel]);
  beep("level"); // beep for level start
  showQuestion();
  startTimer();
}

// Show question
function showQuestion() {
  document.getElementById("question").innerText = levels[levelNames[currentLevel]][index].q;
  resetTimer();
}

// Timer
function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").innerText = "Time left: " + timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time left: " + timeLeft;
    if(timeLeft === 0){
      clearInterval(timer);
      nextQuestion();
    }
  },1000);
}

function startTimer(){
  resetTimer();
}

// Handle answer
function answer(choice){
  clearInterval(timer);
  let currentQ = levels[levelNames[currentLevel]][index];
  if(choice === currentQ.a){
    score++;
    document.getElementById("result").innerText = "✅ Correct!";
    beep("correct");
  } else {
    document.getElementById("result").innerText = "❌ Wrong!";
    beep("wrong");
  }
  document.getElementById("score").innerText = "Score: " + score;
  setTimeout(nextQuestion, 700);
}

// Next question / level
function nextQuestion(){
  index++;
  if(index < levels[levelNames[currentLevel]].length){
    showQuestion();
  } else {
    // End of level
    document.getElementById("buttons").style.display = "none";
    if(currentLevel < levelNames.length - 1){
      document.getElementById("nextLevelBtn").style.display = "inline-block";
      document.getElementById("result").innerText = "Level Completed! Click Next Level.";
      beep("level"); // beep for level complete
    } else {
      endGame();
    }
  }
}

// Go to next level
function nextLevel(){
  currentLevel++;
  index = 0;
  document.getElementById("levelName").innerText = "Level: " + levelNames[currentLevel];
  document.getElementById("buttons").style.display = "block";
  document.getElementById("nextLevelBtn").style.display = "none";
  document.getElementById("result").innerText = "";
  changeBackground(levelNames[currentLevel]);
  beep("level"); // beep for new level
  showQuestion();
  startTimer();
}

// Restart game
function restartGame(){
  document.getElementById("restartBtn").style.display = "none";
  startGame();
}

// End game
function endGame(){
  document.getElementById("question").innerText = "🎉 Game Finished!";
  document.getElementById("result").innerText = "Final Score: " + score + " / 25";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("timer").innerText = "";
  document.getElementById("restartBtn").style.display = "inline-block";
  document.getElementById("nextLevelBtn").style.display = "none";
  document.getElementById("levelName").innerText = "";
}
    

// Create floating particles
function createParticles(num){
  const particlesContainer = document.getElementById("particles");
  for(let i=0; i<num; i++){
    const particle = document.createElement("div");
    particle.classList.add("particle");
    const size = Math.random() * 10 + 5 + "px";
    particle.style.width = size;
    particle.style.height = size;
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.background = `hsl(${Math.random()*360}, 70%, 70%)`;
    particle.style.animationDuration = (Math.random()*5 + 5) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Add 30 particles
createParticles(30);

