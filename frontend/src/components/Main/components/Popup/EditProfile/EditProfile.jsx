import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import Popup from "../Popup.jsx";
import { useState, useContext } from "react";

export default function EditProfile() {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const { handleUpdateUser } = useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser(name, description); // Actualiza la información del usuario
  };

  return (
    <form className="popup__form">
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Nombre"
        className="popup__input popup__input_name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__label popup__label-name" id="name-error"></span>

      <div>
        <input
          type="text"
          id="about"
          name="about"
          placeholder="Acerca de mi"
          className="popup__input popup__input_about"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span
          className="popup__label popup__label-about"
          id="about-error"
        ></span>
      </div>
      <button
        id="save"
        className="popup__button popup__button_save"
        onClick={(event) => handleSubmit(event)}
      >
        Guardar
      </button>
    </form>
  );
}
