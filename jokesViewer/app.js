const URL = "https://api.freeapi.app/api/v1/public/randomjokes";

let safeMode = false;

async function getJoke() {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    let jokes = data.data.data;

    // 🔥 Filter explicit jokes if safe mode ON
    if (safeMode) {
      jokes = jokes.filter((j) => !j.categories.includes("explicit"));
    }

    if (jokes.length === 0) {
      document.getElementById("jokeText").innerText =
        "No safe jokes found. Try again!";
      return;
    }

    const random = jokes[Math.floor(Math.random() * jokes.length)];

    document.getElementById("jokeText").innerText = random.content;
  } catch (err) {
    console.error(err);
  }
}

// Toggle Safe Mode

// Load first joke automatically
getJoke();
