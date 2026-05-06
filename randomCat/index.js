const URL = "https://api.freeapi.app/api/v1/public/cats/cat/random";

async function getCat() {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    const cat = data.data;

    // Update UI
    document.getElementById("catImage").src = cat.image;
    document.getElementById("catName").innerText = cat.name;

    document.getElementById("catDesc").innerText =
      cat.description.slice(0, 120) + "...";

    document.getElementById("traits").innerHTML = `
      🌍 ${cat.origin} | ❤️ ${cat.affection_level}/5 | ⚡ ${cat.energy_level}/5
    `;
  } catch (err) {
    console.error(err);
  }
}

// Load first cat
getCat();
