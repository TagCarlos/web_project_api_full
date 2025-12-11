export default function ImagePopup({ card }) {
  return (
    <div className="popup__container" id="popupContainerImage">
      <img src={card.link} alt="" className="popup__image" />
      <p className="popup__title popup__title_image">{card.name} </p>
    </div>
  );
}
