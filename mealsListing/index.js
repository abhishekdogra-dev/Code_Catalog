const container = document.getElementById("meals");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("search");

let allMeals = [];

// Fetch Meals
async function fetchMeals() {
  try {
    const res = await fetch("https://api.freeapi.app/api/v1/public/meals");
    const data = await res.json();

    allMeals = data.data.data;

    renderMeals(allMeals);

    loader.classList.add("hidden");
    container.classList.remove("hidden");
  } catch (err) {
    loader.innerText = "Failed to load meals 😢";
    console.error(err);
  }
}

// Render Meals
function renderMeals(meals) {
  container.innerHTML = meals
    .map(
      (meal) => `
    <div class="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      
      <img src="${meal.strMealThumb}" 
           class="w-full h-48 object-cover" />

      <div class="p-4 space-y-2">
        <h2 class="text-lg font-semibold">${meal.strMeal}</h2>

        <div class="flex gap-2 text-xs">
          <span class="bg-yellow-500 text-black px-2 py-1 rounded">
            ${meal.strCategory}
          </span>
          <span class="bg-blue-500 px-2 py-1 rounded">
            ${meal.strArea}
          </span>
        </div>

        <button onclick='openModal(${JSON.stringify(meal)})'
          class="mt-3 w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-300">
          View Recipe
        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

// Search
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allMeals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(value),
  );

  renderMeals(filtered);
});

// Modal
function openModal(meal) {
  document.getElementById("modal").classList.remove("hidden");

  document.getElementById("modal-img").src = meal.strMealThumb;
  document.getElementById("modal-title").innerText = meal.strMeal;
  document.getElementById("modal-meta").innerText =
    `${meal.strCategory} • ${meal.strArea}`;

  document.getElementById("modal-desc").innerText =
    meal.strInstructions.slice(0, 400) + "...";
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Init
fetchMeals();
