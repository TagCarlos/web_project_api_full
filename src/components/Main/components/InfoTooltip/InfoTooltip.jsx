import ErrorIcon from "../../../../images/ErrorIcon.png";
import CorrectIcon from "../../../../images/CorrectIcon.png";

export default function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div>
      {isOpen && (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
          <div className="popup__content">
            <button className="popup__close" type="button" onClick={onClose} />
            <img
              style={{ background: "white", width: "25vw" }}
              src={isSuccess ? CorrectIcon : ErrorIcon}
              alt={isSuccess ? "Registro exitoso" : "Error en registro"}
              className="popup__icon"
            />
            <p className="popup__message">{message}</p>
            <button
              className="popup__button popup__button_close_image"
              type="button"
              onClick={onClose}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
