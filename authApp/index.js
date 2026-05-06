const BASE_URL = "https://api.freeapi.app/api/v1/users";

// UI helpers
function showMessage(msg, isError = false) {
  const el = document.getElementById("message");
  el.innerText = msg;
  el.className = isError
    ? "text-red-500 mt-3 text-center"
    : "text-green-500 mt-3 text-center";
}

function toggleLoading(btn, isLoading) {
  btn.disabled = isLoading;
  btn.innerText = isLoading ? "Loading..." : btn.dataset.original;
}

// Switch UI
function showLogin() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");
}

function showRegister() {
  document.getElementById("registerForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");
}

// REGISTER
async function register() {
  const btn = document.getElementById("registerBtn");
  btn.dataset.original = "Register";
  toggleLoading(btn, true);

  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: document.getElementById("regEmail").value,
        username: document.getElementById("regUsername").value,
        password: document.getElementById("regPassword").value,
        role: "ADMIN",
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    showMessage("Registered successfully!");
    showLogin();
  } catch (err) {
    showMessage(err.message, true);
  }

  toggleLoading(btn, false);
}

// LOGIN
async function login() {
  const btn = document.getElementById("loginBtn");
  btn.dataset.original = "Login";
  toggleLoading(btn, true);

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: document.getElementById("loginUsername").value,
        password: document.getElementById("loginPassword").value,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    showMessage("Login successful!");
    loadUser();
  } catch (err) {
    showMessage(err.message, true);
  }

  toggleLoading(btn, false);
}

// LOAD USER (Dashboard)
async function loadUser() {
  try {
    const res = await fetch(`${BASE_URL}/current-user`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw new Error("Not logged in");

    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.add("hidden");

    document.getElementById("userInfo").innerText =
      `Username: ${data.data.username} | Email: ${data.data.email}`;
  } catch (err) {
    showLogin();
  }
}

// LOGOUT
async function logout() {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  showMessage("Logged out");
  showLogin();
}

// AUTO CHECK LOGIN ON LOAD
window.onload = loadUser;
