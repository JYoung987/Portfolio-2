const CHANNELS = [
  { id: "disc", subtitle: "My Projects", channelId: "disc.html", media: {type: "video", src: "Media/EmptyDiscChannel.mp4"} },
  { id: "mii", subtitle: "About Me", channelId: "mii.html", media: {type: "video", src: "Media/miichannel.mp4"} },
  { id: "photos", subtitle: "Project gallery", channelId: "photos.html", media: {type: "video", src: "Media/photochannelhd.mp4"} },
  { id: "shop", subtitle: "Shop", channelId: "shop.html", media: {type: "video", src: "Media/shopchannel.mp4"} },
  { id: "github", subtitle: "Github Portfolio", channelId: "about.html", media: {type: "image", src:"Images/github.png"} },
  { id: "cv", subtitle: "My CV", channelId: "cv.html", media: null },
  { id: "youtube", subtitle: "Videos & demos", channelId: "videos.html", media: {type: "video", src:"Media/youtube.mp4"} },
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
    video.disablePictureInPicture = true;
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
  video.disablePictureInPicture = true;
  video.playsInline = true;
  video.autoplay = true;
  video.className = "channel-video-bg";
  blankTile.appendChild(video);
  video.play().catch(err => console.log("Autoplay blocked:", err));

  channelsContainer.appendChild(blankTile);
}

const channels = document.querySelectorAll('.channel');
const view = document.getElementById('channelView');

channels.forEach(tile => {
  tile.addEventListener('click', () => {
    const channelId = tile.dataset.channel;
    const channelData = CHANNELS.find(c => c.id === channelId);

    if (!channelData) return;

    window.location.href = `channels/${channelData.channelId}`;
  });
});

const tooltip = document.getElementById("tooltip");

channels.forEach(tile => {
  const data = CHANNELS.find(c => c.id === tile.dataset.channel);
  if (!data) return;

  tile.addEventListener('mouseenter', () => {
    tooltip.textContent = data.subtitle;
    tooltip.classList.add('visible');
  });

  tile.addEventListener('mousemove', e => {
    tooltip.style.transform = `translate(${e.clientX }px, ${e.clientY + 25 }px)`;
  });

  tile.addEventListener('mouseleave', () => {
    tooltip.classList.remove('visible');  
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