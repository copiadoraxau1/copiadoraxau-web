const WHATSAPP_NUMBER = "573108558080";

function buildWhatsAppLink() {
  const text = encodeURIComponent("Hola, quiero información sobre la copiadora y me gustaría registrarme.");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

const form = document.getElementById("leadForm");
const successBox = document.getElementById("successBox");
const errorBox = document.getElementById("errorBox");

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function hideError() {
  errorBox.hidden = true;
  errorBox.textContent = "";
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideError();

  const payload = Object.fromEntries(new FormData(form).entries());
  payload.whatsappLink = buildWhatsAppLink();

  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error || "No se pudo enviar el registro.");
    form.reset();
    form.hidden = true;
    successBox.hidden = false;
  } catch (error) {
    showError(error?.message || "Hubo un problema enviando el registro.");
  }
});
