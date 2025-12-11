import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard({ onAddPlaceSubmit, onClose }) {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  /* onAddPlaceSubmit({
    name: name,
    link: link,
  }); */

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddPlaceSubmit(name, link);
  };

  return (
    <form id="form-image" className="popup__form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Titulo"
        className="popup__input popup__input_name"
        required
        minLength="2"
        maxLength="20"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__label-name" id="name-error"></span>
      <input
        type="url"
        id="link"
        name="link"
        placeholder="Enlace a la imagen"
        className="popup__input popup__input_about"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__label-about" id="link-error"></span>

      <button id="saveImage" className="popup__button popup__button_save">
        Guardar
      </button>
    </form>
  );
}
