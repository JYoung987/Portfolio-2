const CHANNELS = [
  { id: "mii", subtitle: "About Me", channelId: "mii.html", media: {"type": "video", "src": "Media/miichannel.mp4"} },
  { id: "disc", subtitle: "Projects", channelId: "disc.html", media: {"type": "video", "src": "Media/EmptyDiscChannel.mp4"} },
  { id: "shop", subtitle: "Extras & experiments", channelId: "shop.html", media: null },
  { id: "about", subtitle: "This portfolio", channelId: "about.html", media: null },
  { id: "cv", subtitle: "Resume", channelId: "cv.html", media: null },
  { id: "youtube", subtitle: "Videos & demos", channelId: "videos.html", media: null },
  { id: "photos", subtitle: "Project gallery", channelId: "photos.html", media: null }
];

const channelsContainer = document.getElementById("channels");

CHANNELS.forEach(channel => {
  const tile = document.createElement("div");
  tile.className = `channel channel-${channel.id}`;
  tile.dataset.channel = channel.id;

  if (channel.media?.type === "image") {
    tile.style.backgroundImage = `url('${channel.media.src}')`;
    tile.style.backgroundSize = "cover";
    tile.style.backgroundPosition = "center";
  }

  if (channel.media?.type === "video") {
    const video = document.createElement("video");
    video.src = channel.media.src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.className = "channel-video-bg";
    tile.appendChild(video);
  }
  channelsContainer.appendChild(tile);
});

const COLUMNS = 4;
const ROWS = 3;
const TOTAL_TILES = COLUMNS * ROWS;

const blanksNeeded = Math.max(0, TOTAL_TILES - CHANNELS.length);

for (let i = 0; i < blanksNeeded; i++) {
  const blankTile = document.createElement("div");
  blankTile.className = "channel channel-empty";

  const video = document.createElement("video");
  video.src = "Media/BlankChannel.mp4";
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.className = "channel-video-bg";
  blankTile.appendChild(video);
  video.play().catch(err => console.log("Autoplay blocked:", err));

  channelsContainer.appendChild(blankTile);
}

const channels = document.querySelectorAll('.channel');
const view = document.getElementById('channelView');
const label = document.getElementById('channelLabel');
const mailBtn = document.getElementById('mailBtn');
const wiiBtn = document.getElementById('wiiBtn');

channels.forEach(tile => {
  tile.addEventListener('click', () => {
    const channelId = tile.dataset.channel;
    const channelData = CHANNELS.find(c => c.id === channelId);

    if (!channelData) return;

    window.location.href = `channels/${channelData.channelId}`;
  });
});


/* Clock Function */
function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var session = "AM";
  if (h == 0) { h = 12; }
  if (h > 12) { h = h - 12; session = "PM"; }
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  var time = h + ":" + m + " " + session;
  document.getElementById("MyClockDisplay").textContent = time;
  setTimeout(showTime, 1000);
}
showTime();

/* Disc Rotation Function */

const imagecontainer = document.querySelector('.disc-scene');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');

let x = 0;

prevBtn.addEventListener('click', () => {
  x = x + 45
  rotate();
});

nextBtn.addEventListener('click', () => {
  x = x - 45
  rotate();
});

function rotate() {
  imagecontainer.style.transform = 'perspective(1000px) rotateY(${x}deg)';
}