import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { popupForm, userName, userJob, initialCards, openButtonEditProfile, closeButtonSave, closeButtonX, formElement } from "../components/utils.js";
import { api } from "../components/Api.js";






const userProfile = new UserInfo({
  nameSelector: ".header__name",
  jobSelector: ".header__activity"
});
api.infoUser().then(function (data) {
  userProfile.setUserInfo({ userName: data.name, userJob: data.about })
});

api.getInitialCards().then(function (initialCards) {
  const cardSection = new Section({
    items: initialCards,
    renderer: createCard,
  }, ".container");


  const openPopup = new Popup(".popup");
  openPopup.setEventListeners();

  const popupProfile = new PopupWithForm("#edit-popup", (data) => {
    api.editProfile(data.name, data.about).then(function () {
      userProfile.setUserInfo({ userName: data.name, userJob: data.about })
    })

  });
  function handleAddLike(cardId) {
    api.addLike(cardId).then(function (card) { });
  }
  function handleDeleteLike(cardId) {
    api.deleteLike(cardId).then(function (card) { });
  }

  popupProfile.setEventListeners();
  const popupCards = new PopupWithForm("#new-card-popup", (data) => {
    api.addCard(data.name, data.link).then(function () {
      createCard({
        name: data.name,
        link: data.link,
      })
    })

  });
  popupCards.setEventListeners();

  const profileImageContainer = document.querySelector('.header__avatar');
  const editAvatarPopup = new PopupWithForm('#popupAvatar', (formData) => {
    // Cambia texto del botón mientras se procesa
    const submitButton = editAvatarPopup.popupElement.querySelector('.popup__button_save');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Guardando...';

    // Envia solicitud al servidor
    api.avatarPhoto(formData.avatar)
      .then(userData => {
        // Actualiza la imagen en la interfaz
        document.querySelector('.header__image').src = userData.avatar;
        editAvatarPopup.close();
      })
      .catch(() => {
        alert("Error al guardar los cambios");
      })
      .finally(() => {
        // Restaura texto del botón
        submitButton.textContent = originalText;
      });
  });
  editAvatarPopup.setEventListeners();
  // Abrir popup al hacer clic en la foto
  profileImageContainer.addEventListener('click', () => {
    editAvatarPopup.open();
  });


  const popupWithImage = new PopupWithImage("#popupImage");
  popupWithImage.setEventListeners();

  // Crear popup de imagen
  const imagePopup = new PopupWithImage("#popupImage");
  imagePopup.setEventListeners();

  // Función para manejar clic en tarjeta
  const handleCardClick = (link, leyend) => {

    imagePopup.open(leyend, link);
  };

  const confirmDeletePopup = new PopupWithConfirmation('#popupConfirmation');
  confirmDeletePopup.setEventListeners();

  //crear funcion de deleteButton
  function deleteButton(action, cardId) {
    confirmDeletePopup.open();
    const apiDeleteCard = () => api.deleteCard(cardId).then().catch()
    confirmDeletePopup.handleConfirm(action, apiDeleteCard);
  }

  // Función para crear tarjetas
  function createCard(cardData) {
    const card = new Card(cardData._id, cardData.name, cardData.link, '#card-template', handleCardClick, handleAddLike, handleDeleteLike, cardData.isLiked, (action) => deleteButton(action, cardData._id));
    const cardElement = card.createCard();
    cardSection.addItem(cardElement);
    card.setEventListener();

  };
  cardSection.renderElement();

  //abre formulario
  function abrirFormulario() {
    popupProfile.open();
  }

  //cierra formulario
  function cerrarFormulario() {
    popupForm.classList.remove("popup_opened");
    popupForm.classList.remove("modalOverlay");
  }

  openButtonEditProfile.addEventListener("click", abrirFormulario);
  closeButtonSave.addEventListener("click", cerrarFormulario);
  closeButtonX.addEventListener("click", cerrarFormulario);

  // crea tarjetas
  const templateCard = document.querySelector(".template__card")
  const cardsList = document.querySelector(".container");


  function closeModal() {
    popupImage.classList.remove("modalOverlay");
    popupImage.classList.remove("popup_opened");
    popupFormNewPlace.classList.remove("popup_opened");
    popupFormNewPlace.classList.remove("modalOverlay");
  };


  let closeFormImage = document.querySelector(".popup__button_close_image");
  const popupOpenImage = document.querySelector("#popupImage");
  function closeFormImages() {
    popupOpenImage.classList.remove("popup_opened");
  }
  closeFormImage.addEventListener("click", closeFormImages);


  //crea formulario para añadir tarjeta "nuevo lugar"
  const openButtonNewPlace = document.querySelector("#add-image");
  const popupFormNewPlace = document.querySelector("#new-card-popup");
  const closeButtonImage = popupFormNewPlace.querySelector("#saveImage");
  const closeButtonImageX = popupFormNewPlace.querySelector(".popup__button_close");

  function openFormNewPlace() {
    popupCards.open();
  }

  openButtonNewPlace.addEventListener("click", openFormNewPlace);
  closeButtonImageX.addEventListener("click", closeModal);
  closeButtonImageX.addEventListener("click", closeModal);

  //intancias para las clases
  const validationConfiguration = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button_save",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };

  const validationConfigurationCards = {
    formSelector: "#form-image",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };

  const validationConfigurationAvatar = {
    formSelector: "#form-image",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };



  const formValidatorProfile = new FormValidator(validationConfiguration);
  formValidatorProfile.enableValidation();

  const formValidatorCard = new FormValidator(validationConfigurationCards);
  formValidatorCard.enableValidation();

  const formValidatorAvatar = new FormValidator(validationConfigurationAvatar);
  formValidatorAvatar.enableValidation();



});