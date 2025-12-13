import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const avatarValue = avatarRef.current.value;

    handleUpdateAvatar(avatarValue);
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        type="url"
        className="popup__input popup__input_avatar"
        name="avatar"
        placeholder="coloca url de imagen"
        required
        ref={avatarRef}
      />
      <button className="popup__button_save" type="submit">
        Guardar
      </button>
    </form>
  );
}
