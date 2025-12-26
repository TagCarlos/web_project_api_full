import ImagePopup from "../Popup/ImagePopup/ImagePopup.jsx";
import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function Card({ card, onCardLike, onCardDelete, ...props }) {
  /* const { name, link, isLiked } = card; */

  const { onImageClick } = props;

  const { currentUser } = useContext(CurrentUserContext);

  const imageComponent = {
    title: null,
    children: <ImagePopup card={card} />,
  };

  /* const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `container__trash ${
    isOwn ? "container__trash_active" : ""
  }`; */
  const cardDeleteButtonClassName = `container__trash ${
    card.isLiked ? `container__trash_active` : "container__trash"
  }`;

  const cardLikeButtonClassName = `container__heart ${
    card.isLiked ? `container__heart_active` : "container__heart"
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <div className="container__cards">
      <img
        className="container__image"
        src={card.link}
        alt={card.name}
        onClick={() => onImageClick(imageComponent)}
      />
      <div className="container__hearts">
        <h2 className="container__title">{card.name} </h2>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
      </div>
    </div>
  );
}
