const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

const replay10 = document.getElementById("replay10");
const forward10 = document.getElementById("forward10");

const videoStatus = document.getElementById("videoStatus");

const speed = document.getElementById("speed");
const speedSelect = document.getElementById("speedSelect");
const speedOption = document.querySelectorAll(".speedOption");

const toggleVideoStatus = () => {
  if (video.paused) video.play();
  else video.pause();
};

const updatePlayIcon = () => {
  handleResetSpeed();

  if (video.paused)
    play.innerHTML = `<span class="material-symbols-outlined"> play_arrow </span>`;
  else play.innerHTML = `<span class="material-symbols-outlined">pause</span>`;
};

const stopVideo = () => {
  handleResetSpeed();
  video.currentTime = 0;
  video.pause();
};

const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;

  // min
  let mins = Math.floor(video.currentTime / 60);
  if (mins < video.duration) mins = `${mins < 10 ? "0" : ""}${String(mins)}`;

  // sec
  let secs = Math.floor(video.currentTime % 60);
  if (secs < video.duration) secs = `${secs < 10 ? "0" : ""}${String(secs)}`;

  timestamp.innerHTML = `${mins}:${secs}`;
};

const setVideoProgress = () => {
  video.currentTime = (+progress.value * video.duration) / 100;
};

const handleSkip = (state, skip) => {
  if (state === "forward") video.currentTime += skip;
  else video.currentTime -= skip;
};

const displaySpeedPanel = () => {
  const classList = speedSelect.classList;
  if (classList.contains("d-block")) {
    classList.remove("d-block");
    classList.add("d-none");
  } else {
    classList.remove("d-none");
    classList.add("d-block");
  }
};

const handleSpeed = (speed) => {
  video.playbackRate = speed;
  updateVideoState(speed);
};

const updateVideoState = (speed) => {
  if (speed === "1") return;

  videoStatus.innerText = speed + "X";
  videoStatus.style.visibility = "visible";

  setTimeout(() => {
    videoStatus.style.visibility = "hidden";
  }, 500);
};

const handleResetSpeed = () => {
  video.playbackRate = 1;

  [...speedOption].map((el) => {
    if (el.childNodes[1].classList.contains("selected")) {
      el.childNodes[1].classList.remove("selected");
      el.childNodes[1].innerText = "radio_button_unchecked";
    }

    if (el.childNodes[2].innerText === "normal") {
      el.childNodes[1].classList.add("selected");
      el.childNodes[1].innerText = "radio_button_checked";
    }
  });
};

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

replay10.addEventListener("click", () => handleSkip("replay", 10));
forward10.addEventListener("click", () => handleSkip("forward", 10));

speed.addEventListener("click", displaySpeedPanel);

for (let i = 0; i < speedOption.length; i++) {
  speedOption[i].addEventListener("click", () => {
    [...speedOption].map((el) => {
      if (el.childNodes[1].classList.contains("selected")) {
        el.childNodes[1].classList.remove("selected");
        el.childNodes[1].innerText = "radio_button_unchecked";
      }
    });

    speedOption[i].childNodes[1].classList.add("selected");
    speedOption[i].childNodes[1].innerText = "radio_button_checked";

    handleSpeed(
      speedOption[i].childNodes[2].innerText === "normal"
        ? "1"
        : speedOption[i].childNodes[2].innerText
    );
  });
}
