const { getMediaInfo } = require("./fetchmedia");

document.getElementById("play").addEventListener("click", () => {
  console.log("Toggle play/pause");
});

document.getElementById("prev").addEventListener("click", () => {
  console.log("Previous track");
});

document.getElementById("next").addEventListener("click", () => {
  console.log("Next track");
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
}, 3000);
