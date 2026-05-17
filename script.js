import { useState } from "react";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    email: "",
    capital: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      alert("Registro enviado correctamente");
      setForm({
        nombre: "",
        whatsapp: "",
        email: "",
        capital: "",
        mensaje: "",
      });
    } else {
      alert("Error al enviar el registro");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required />
      <input name="whatsapp" placeholder="WhatsApp" value={form.whatsapp} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
      <input name="capital" placeholder="Capital disponible" value={form.capital} onChange={handleChange} required />
      <textarea name="mensaje" placeholder="Mensaje" value={form.mensaje} onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Registrarme ahora"}
      </button>
    </form>
  );
}
