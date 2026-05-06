const URL = "https://api.freeapi.app/api/v1/public/randomproducts";

async function fetchProducts() {
  try {
    const res = await fetch(URL);
    const data = await res.json();

    renderProducts(data.data.data);
  } catch (err) {
    console.error(err);
  }
}

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((p) => {
    const discountedPrice = (
      p.price -
      (p.price * p.discountPercentage) / 100
    ).toFixed(0);

    const card = document.createElement("div");

    card.className =
      "bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer";

    card.innerHTML = `
      <div class="relative">

        <img src="${p.thumbnail}" class="w-full h-48 object-cover rounded-lg" />

        <span class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          ${p.discountPercentage}% OFF
        </span>

      </div>

      <div class="mt-3">

        <h2 class="font-semibold text-sm line-clamp-2">${p.title}</h2>

        <p class="text-gray-500 text-xs mt-1">${p.brand}</p>

        <div class="flex items-center gap-2 mt-2">
          <span class="text-lg font-bold text-green-600">$${discountedPrice}</span>
          <span class="text-sm text-gray-400 line-through">$${p.price}</span>
        </div>

        <div class="text-yellow-500 text-sm mt-1">
          ⭐ ${p.rating}
        </div>

      </div>
    `;

    container.appendChild(card);
  });
}

fetchProducts();
