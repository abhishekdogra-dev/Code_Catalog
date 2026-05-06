const usersContainer = document.getElementById("users");
const loader = document.getElementById("loader");
const refreshBtn = document.getElementById("refreshBtn");

async function fetchUsers() {
  loader.style.display = "block";
  usersContainer.innerHTML = "";

  try {
    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/randomusers",
    );
    const data = await res.json();

    const users = data.data.data;

    loader.style.display = "none";

    users.forEach((user) => {
      const card = document.createElement("div");

      card.className =
        "bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5";

      card.innerHTML = `
              <div class="flex flex-col items-center text-center">
                <img src="${user.picture.large}" 
                     class="w-24 h-24 rounded-full border-4 border-gray-200" />

                <h2 class="mt-3 text-lg font-semibold">
                  ${user.name.title} ${user.name.first} ${user.name.last}
                </h2>

                <p class="text-gray-500 text-sm">${user.email}</p>
              </div>

              <div class="mt-4 text-sm text-gray-600 space-y-1">
                <p>📍 ${user.location.city}, ${user.location.country}</p>
                <p>📞 ${user.phone}</p>
                <p>🎂 Age: ${user.dob.age}</p>
              </div>

              <div class="mt-4 flex justify-between items-center">
                <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  ${user.nat}
                </span>

                <span class="text-xs px-2 py-1 rounded-full ${
                  user.gender === "male"
                    ? "bg-green-100 text-green-600"
                    : "bg-pink-100 text-pink-600"
                }">
                  ${user.gender}
                </span>
              </div>
            `;

      usersContainer.appendChild(card);
    });
  } catch (err) {
    loader.innerText = "❌ Failed to load users";
  }
}

refreshBtn.addEventListener("click", fetchUsers);

fetchUsers();
