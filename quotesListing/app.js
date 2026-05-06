const URL = "https://api.freeapi.app/api/v1/public/quotes";

let page = 1;

async function fetchQuotes() {
  try {
    const res = await fetch(`${URL}?page=${page}`);
    const data = await res.json();

    renderQuotes(data.data.data);
  } catch (err) {
    console.error(err);
  }
}

function renderQuotes(quotes) {
  const container = document.getElementById("quotes");

  quotes.forEach((q) => {
    const card = document.createElement("div");

    card.className =
      "bg-white/10 backdrop-blur-md p-6 rounded-xl shadow hover:scale-[1.01] transition";

    card.innerHTML = `
      <p class="text-lg italic leading-relaxed">
        “${q.content}”
      </p>

      <div class="mt-4 flex justify-between items-center">
        <span class="text-sm text-gray-300">— ${q.author}</span>

        <span class="text-xs text-gray-400">
          ${q.tags.length ? q.tags[0] : "General"}
        </span>
      </div>
    `;

    container.appendChild(card);
  });
}

function loadMore() {
  page++;
  fetchQuotes();
}

fetchQuotes();
