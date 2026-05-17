# Configuración completa del formulario con Resend

## 1. Reemplazar todo el contenido de `script.js`

Borra todo lo que tiene actualmente `script.js` y pega esto:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea");
  const [nombreInput, whatsappInput, emailInput, capitalInput, mensajeInput] = inputs;

  const button = form.querySelector('button[type="submit"]');
  const originalButtonText = button?.textContent || "Registrarme ahora";

  let statusBox = document.getElementById("form-status");
  if (!statusBox) {
    statusBox = document.createElement("div");
    statusBox.id = "form-status";
    statusBox.style.marginTop = "14px";
    statusBox.style.padding = "12px 14px";
    statusBox.style.borderRadius = "12px";
    statusBox.style.fontSize = "14px";
    statusBox.style.display = "none";
    form.appendChild(statusBox);
  }

  const showStatus = (message, ok = false) => {
    statusBox.textContent = message;
    statusBox.style.display = "block";
    statusBox.style.background = ok ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)";
    statusBox.style.border = ok ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(239,68,68,0.4)";
    statusBox.style.color = "#fff";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      nombre: nombreInput?.value.trim() || "",
      whatsapp: whatsappInput?.value.trim() || "",
      email: emailInput?.value.trim() || "",
      capital: capitalInput?.value.trim() || "",
      mensaje: mensajeInput?.value.trim() || "",
    };

    if (!payload.nombre || !payload.whatsapp || !payload.email) {
      showStatus("Completa nombre, WhatsApp y correo electrónico.", false);
      return;
    }

    if (button) {
      button.disabled = true;
      button.textContent = "Enviando...";
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar el registro.");
      }

      form.reset();
      showStatus("Registro enviado correctamente. Te contactaremos pronto.", true);
    } catch (error) {
      showStatus(error.message || "Ocurrió un error al enviar el formulario.", false);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalButtonText;
      }
    }
  });
});
```

---

# 2. Crear carpeta `api`

En GitHub:

* Presiona `Agregar archivo`
* Luego `Crear nuevo archivo`

En el nombre escribe:

```text
api/lead.js
```

---

# 3. Pegar este código dentro de `api/lead.js`

```javascript
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const {
    nombre = "",
    whatsapp = "",
    email = "",
    capital = "",
    mensaje = "",
  } = body || {};

  if (!nombre.trim() || !whatsapp.trim() || !email.trim()) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.EMAIL_TO;

  if (!resendKey || !toEmail) {
    return res.status(500).json({
      error: "Faltan variables de entorno: RESEND_API_KEY o EMAIL_TO.",
    });
  }

  const subject = `Nuevo registro: ${nombre}`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>Nuevo registro recibido</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
      <p><strong>Capital disponible:</strong> ${escapeHtml(capital)}</p>
      <p><strong>Mensaje:</strong><br>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from: "Copiadora XAU <onboarding@resend.dev>",
      to: [toEmail],
      subject,
      html,
      reply_to: email,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(500).json({
      error: "No se pudo enviar el correo.",
      details: errorText,
    });
  }

  return res.status(200).json({ ok: true });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
```

---

# 4. Variables de entorno en Vercel

Debes tener exactamente estas:

## Variable 1

```text
RESEND_API_KEY
```

Valor:

```text
Tu API KEY de Resend
```

---

## Variable 2

```text
EMAIL_TO
```

Valor:

```text
copiadoraxau@gmail.com
```

---

# 5. Guardar cambios

En GitHub:

* Presiona `Confirmar cambios`
* Luego confirma otra vez.

---

# 6. Volver a Vercel

En Vercel:

* Ve a `Despliegues`
* Presiona `Redistribuir`

---

# 7. Probar formulario

Abre:

```text
www.copiadoraxau.com
```

Llena el formulario y ahora sí debe llegar el correo automáticamente.
