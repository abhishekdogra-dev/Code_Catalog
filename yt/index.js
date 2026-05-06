const URL = "https://api.freeapi.app/api/v1/public/youtube/videos";

async function fetchVideos() {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    renderVideos(data.data.data);
  } catch (err) {
    console.error(err);
  }
}

function renderVideos(videos) {
  const container = document.getElementById("videos");

  container.innerHTML = "";

  videos.forEach((video) => {
    const v = video.items;

    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow hover:shadow-lg transition";

    card.innerHTML = `
      <img src="${v.snippet.thumbnails.high.url}" class="rounded-t-lg w-full" />

      <div class="p-3">
        <h2 class="font-semibold text-sm line-clamp-2">${v.snippet.title}</h2>
        
        <p class="text-gray-500 text-xs mt-1">${v.snippet.channelTitle}</p>

        <div class="flex justify-between text-xs text-gray-400 mt-2">
          <span>👁 ${v.statistics.viewCount}</span>
          <span>👍 ${v.statistics.likeCount}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

fetchVideos();
