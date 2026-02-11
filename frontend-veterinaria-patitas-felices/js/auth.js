const API_URL = "http://localhost:3000";

const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const form = document.getElementById("formAuth");
const message = document.getElementById("message");

let mode = "login";

btnLogin.onclick = () => {
  mode = "login";
  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");
};

btnRegister.onclick = () => {
  mode = "register";
  btnRegister.classList.add("active");
  btnLogin.classList.remove("active");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    if (mode === "register") {
      await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      message.textContent = "Usuario registrado. Ahora podés loguearte.";
      return;
    }

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.token) throw new Error("Credenciales inválidas");

    localStorage.setItem("token", data.token);

    const payload = JSON.parse(atob(data.token.split(".")[1]));
    localStorage.setItem("role", payload.roles[0]);

    window.location.href = "mascotas.html";
  } catch (err) {
    message.textContent = err.message;
  }
});
