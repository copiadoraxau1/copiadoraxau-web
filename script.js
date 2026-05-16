const WHATSAPP_NUMBER = "573108558080"; // Reemplaza por tu número real con código país

function buildWhatsAppLink() {
  const text = encodeURIComponent("Hola, quiero información sobre la copiadora.");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

document.getElementById("cta-whatsapp").href = buildWhatsAppLink();
document.getElementById("cta-whatsapp-top").href = buildWhatsAppLink();

const form = document.getElementById("lead-form");
const success = document.getElementById("success");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem("copiadora_xau_lead", JSON.stringify(data));

  form.hidden = true;
  success.hidden = false;
});
