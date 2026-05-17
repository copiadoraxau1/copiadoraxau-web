document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("_subject", "Nuevo registro desde la web");

    try {
      const response = await fetch("https://formsubmit.co/ajax/copiadoraxau@gmail.com", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Respuesta no exitosa");
      }

      alert("Registro enviado correctamente");
      form.reset();
    } catch (error) {
      alert("Error de conexión");
      console.error(error);
    }
  });
});
