import { useState } from "react";

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData.email, formData.password);
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <form className="popup__form" onSubmit={handleSubmit}>
          <h2 className="popup__title">Regístrate</h2>
          <input
            className="popup__input popup__input_name"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            required
          />
          <input
            className="popup__input popup__input_about"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
          <button className="popup__button popup__button_save" type="submit">
            Regístrarse
          </button>
          <a href="/signin">¿Ya eres miembro? Inicia sesión aquí</a>
        </form>
      </div>
    </div>
  );
}
