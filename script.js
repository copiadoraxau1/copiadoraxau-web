const form = document.getElementById("registroForm");

form.addEventListener("submit", async function (e) {

  e.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value.trim(),
    whatsapp: document.getElementById("whatsapp").value.trim(),
    email: document.getElementById("email").value.trim(),
    capital: document.getElementById("capital").value.trim(),
    mensaje: document.getElementById("mensaje").value.trim()
  };

  try {

    const response = await fetch("/api/registro", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)

    });

    const result = await response.json();

    if (!result.ok) {

      alert("No se pudo guardar el registro");
      return;

    }

    const texto = encodeURIComponent(

      `Hola, me registré en la página.\n\n` +

      `Nombre: ${data.nombre}\n` +
      `WhatsApp: ${data.whatsapp}\n` +
      `Correo: ${data.email}\n` +
      `Capital: ${data.capital}\n` +
      `Mensaje: ${data.mensaje || "Sin mensaje"}`

    );

    window.location.href =
      `https://wa.me/573108558080?text=${texto}`;

  } catch (error) {

    alert("Error del servidor");

  }

});
