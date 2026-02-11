const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token) window.location.href = "index.html";

const tabla = document.querySelector("#tablaMascotas tbody");
const btnNueva = document.getElementById("btnNueva");
const accionesHeader = document.getElementById("accionesHeader");
const btnLogout = document.getElementById("btnLogout");

const modal = document.getElementById("modal");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

let editId = null;

/* =========================
   LOGOUT / ROLES
========================= */

btnLogout.onclick = () => {
  localStorage.clear();
  window.location.href = "index.html";
};

if (role === "admin") {
  btnNueva.style.display = "inline-block";
  accionesHeader.style.display = "table-cell";
}

/* =========================
   DUENOS (NUEVO)
========================= */

async function cargarDuenos(selectedId = null) {
  const select = document.getElementById("mDueno");
  select.innerHTML = "";

  const res = await fetch(`${API_URL}/duenos`, {
    headers: { Authorization: "Bearer " + token },
  });

  const duenos = await res.json();

  duenos.forEach((d) => {
    const option = document.createElement("option");
    option.value = d.id_dueno;
    option.textContent = `${d.nombre} ${d.apellido}`;

    if (selectedId && d.id_dueno === selectedId) {
      option.selected = true;
    }

    select.appendChild(option);
  });
}

/* =========================
   MODAL
========================= */

function abrirModal(titulo, mascota = null) {
  document.getElementById("modalTitle").textContent = titulo;
  modal.classList.remove("hidden");

  if (mascota) {
    document.getElementById("mNombre").value = mascota.nombre;
    document.getElementById("mEspecie").value = mascota.especie;
    document.getElementById("mFecha").value =
      mascota.fecha_nacimiento.split("T")[0];

    editId = mascota.id_mascota;
    cargarDuenos(mascota.id_dueno); // ← CLAVE
  } else {
    editId = null;

    document.getElementById("mNombre").value = "";
    document.getElementById("mEspecie").value = "";
    document.getElementById("mFecha").value = "";

    cargarDuenos(); // ← CLAVE
  }
}

btnCancelar.onclick = () => modal.classList.add("hidden");

/* =========================
   GUARDAR
========================= */

btnGuardar.onclick = async () => {
  const data = {
    nombre: document.getElementById("mNombre").value,
    especie: document.getElementById("mEspecie").value,
    fecha_nacimiento: document.getElementById("mFecha").value,
    id_dueno: Number(document.getElementById("mDueno").value),
  };

  if (editId) {
    await fetch(`${API_URL}/mascotas/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
  } else {
    await fetch(`${API_URL}/mascotas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
  }

  modal.classList.add("hidden");
  cargarMascotas();
};

btnNueva.onclick = () => abrirModal("Nueva Mascota");

/* =========================
   LISTADO
========================= */

async function cargarMascotas() {
  const res = await fetch(`${API_URL}/mascotas`, {
    headers: { Authorization: "Bearer " + token },
  });

  const mascotas = await res.json();
  tabla.innerHTML = "";

  mascotas.forEach((m) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${m.id_mascota}</td>
      <td>${m.nombre}</td>
      <td>${m.especie}</td>
      <td>${m.fecha_nacimiento.split("T")[0]}</td>
      <td>${m.dueno_nombre} ${m.dueno_apellido}</td>
    `;

    if (role === "admin") {
      const acciones = document.createElement("td");
      acciones.innerHTML = `
        <button onclick='abrirModal("Editar Mascota", ${JSON.stringify(
          m
        )})'>Editar</button>
        <button onclick="eliminarMascota(${m.id_mascota})">Eliminar</button>
      `;
      row.appendChild(acciones);
    }

    tabla.appendChild(row);
  });
}

async function eliminarMascota(id) {
  if (!confirm("¿Eliminar mascota?")) return;

  await fetch(`${API_URL}/mascotas/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  cargarMascotas();
}

/* =========================
   INIT
========================= */

cargarMascotas();
