const { getMediaInfo, playPause, next, prev, status } = require("./fetchmedia");

document.getElementById("play-pause").addEventListener("click", async () => {
  const playPauseImg = document.getElementById("play-pause-img");
  playPauseImg.classList.add("hidden");
  setTimeout(() => {
    playPauseImg.src = playState === "Playing" ? "./images/play.svg" : "./images/pause.svg";
    playPauseImg.classList.remove("hidden");
  }, 200)

  const currentSrc = playPauseImg.src;

  if (currentSrc.includes("play.svg")) {
    playPauseImg.src = "./images/pause.svg";
  } else {
    playPauseImg.src = "./images/play.svg";
  }
  playPause();
  const playState = await status();
  playPauseImg.src = playState === "Playing" ? "./images/pause.svg" : "./images/play.svg";
});

document.getElementById("prev").addEventListener("click", () => {
  prev();
});

document.getElementById("next").addEventListener("click", () => {
  next();
});

setInterval(async () => {
  const info = await getMediaInfo();
  // console.clear();
  // console.log("Now Playing: ", info);

  document.getElementById("title").textContent = info[0].title;
  document.getElementById("artist").textContent = info[0].artist;
  // document.getElementById('album').textContent = info[0].album;
  // console.log('Album Cover: ', info[0].coverArt);

  const albumArt = document.getElementById("albumArt");
  if (info[0].coverArt) {
    albumArt.src = info[0].coverArt;
  } else {
    albumArt.src = "images/fallback.png"; // Fallback image if cover art is not available
  }

  const playState = await status();
  if (playState === "Playing") {
    document.getElementById("play-pause-img").src = "./images/pause.svg";
    console.log("set to pause")
  } else {
    document.getElementById("play-pause-img").src = "./images/play.svg";
  }
  console.log(playState)
}, 3000);
