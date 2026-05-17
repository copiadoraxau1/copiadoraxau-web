document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("registro-form");

  if (!form) return;

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData(form);

    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("_subject", "Nuevo registro desde la web");

    try {

      const response = await fetch(
        "https://formsubmit.co/ajax/copiadoraxau@gmail.com",
        {
          method: "POST",
          body: formData
        }
      );

      if (response.ok) {

        alert("Registro enviado correctamente");

        form.reset();

      } else {

        alert("Error enviando formulario");

      }

    } catch (error) {

      alert("Error de conexión");

      console.error(error);

    }

  });

});
