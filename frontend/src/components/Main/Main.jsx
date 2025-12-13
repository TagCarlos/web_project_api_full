import NewCard from "./components/Popup/NewCard/NewCard.jsx";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar.jsx";
import Popup from "./components/Popup/Popup.jsx";
import avatar from "../../images/avatar.jpg";
import editavatar from "../../images/EditAvatar.png";
import edit from "../../images/edit.png";
import Card from "./components/Card/Card.jsx";
import { useState, useContext, useEffect } from "react";
import EditProfile from "./components/Popup/EditProfile/EditProfile.jsx";
import { Api } from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import InfoTooltip from "../../components/Main/components/InfoTooltip/InfoTooltip.jsx";
import Register from "./components/Register/Register.jsx";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  cards,
  onCardLike,
  onCardDelete,
}) {
  /* const [popup, setPopup] = useState(null); */

  /*  const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
      authorization: "78875212-3ff1-4176-a379-657de165f703",
      "Content-Type": "application/json",
    },
  }); */

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar Nombre",
    children: <EditProfile />,
  };

  const { currentUser } = useContext(CurrentUserContext);

  /* function handleOpenPopup() {
    onOpenPopup(); //setPopup
  } */

  function handleClosePopup() {
    onOpenPopup(null);
  }

  return (
    <main>
      <section className="header">
        <h1 className="header__title">
          Around <span className="header__subtitle"> the MX</span>
          <div
            style={{
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {currentUser.email}{" "}
          </div>
          <div style={{ textAlign: "end" }}>
            <a className="header__login" href="signin">
              Iniciar sesión
            </a>
            <a className="header__register" href="signup">
              Regístrate
            </a>
          </div>
        </h1>
        <div className="header__container">
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="header__image"
          />
          <img
            src={editavatar}
            alt="editAvatar"
            className="header__avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
          <div>
            <h2 className="header__name">{currentUser.name} </h2>
            <p className="header__activity">{currentUser.about} </p>
          </div>
          <button
            className="header__button header__button_edit"
            id="edit"
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <img src={edit} alt="edit" />
          </button>
          <button
            className="header__button header__button_add"
            id="add-image"
            onClick={() => onOpenPopup(newCardPopup)}
          >
            +
          </button>
        </div>
      </section>
      <div className="container">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onImageClick={onOpenPopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </div>
      {popup && <Popup onClose={onClosePopup}>{popup.children} </Popup>}
    </main>
  );
}
