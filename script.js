document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: form.querySelector('input[name="nombre"]')?.value || "",
      whatsapp: form.querySelector('input[name="whatsapp"]')?.value || "",
      email: form.querySelector('input[name="email"]')?.value || "",
      capital: form.querySelector('input[name="capital"]')?.value || "",
      mensaje: form.querySelector('textarea[name="mensaje"]')?.value || ""
    };

    try {

      const response = await fetch("https://formsubmit.co/ajax/TUCORREO@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert("Registro enviado correctamente");
        form.reset();
      } else {
        alert("Error enviando formulario");
      }

    } catch (error) {
      alert("Error de conexión");
    }

  });

});
