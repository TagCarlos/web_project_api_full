import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import "../index.css";
import Footer from "./Footer/Footer";
import avatar from "../images/avatar.jpg";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Api } from "../utils/api.js";
import NewCard from "./Main/components/Popup/NewCard/NewCard";
import EditAvatar from "./Main/components/Popup/EditAvatar/EditAvatar";
import EditProfile from "./Main/components/Popup/EditProfile/EditProfile";
import Popup from "./Main/components/Popup/Popup.jsx";
import Login from "./Main/components/Login/Login.jsx";
import Register from "./Main/components/Register/Register.jsx";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { register, authorize, checkToken } from "../utils/auth.js";
import ProtectedRoute from "./Main/components/ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./Main/components/InfoTooltip/InfoTooltip.jsx";

function App() {
  const api = new Api({
    baseUrl: "https://api.aroundmx.com.mx.algoconcreto.com.mx",
    headers: {
      "Content-Type": "application/json",
    },
  });

  /* const [count, setCount] = useState(0); */
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  /* useEffect(() => {
    (async () => {
      //colocar logica para verificar si hay un token en el localstorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No hay token");
        return;
      }
      token !== null; 
      await api.getUserInfo(token).then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []); */

  /* useEffect(() => {
    (async () => {
      await api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => console.error(error));
    })();
  }, []); */

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState("");
  const [isSuccessInfoTooltip, setIsSuccessInfoTooltip] = useState(false);
  const [token, setToken] = useState(null);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlace = (newCard) => {
    setCards([newCard, ...cards]);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

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

  const handleCardLike = async (card) => {
    await api
      .addLike(card._id, !card.isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const handleCardDelete = async (card) => {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error(error));
  };

  const handleOpenPopup = (popupElement) => {
    setPopup(popupElement);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  const handleClosePopupEsc = (e) => {
    if (e.key === "Escape") {
      return handleClosePopup();
    }
  };

  const handleClosePopupOverlay = (e) => {
    if (
      !Array.from(e.target.classList).includes("popup__form") &&
      Array.from(e.target.classList).includes("popup")
    ) {
      return handleClosePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClosePopupOverlay);
    document.addEventListener("keydown", handleClosePopupEsc);
    return () => {
      document.removeEventListener("keydown", handleClosePopupEsc);
      document.removeEventListener("click", handleClosePopupOverlay);
    };
  }, []);

  const handleCloseInfoTooltip = () => {
    setIsInfoTooltipOpen(false);
  };

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getCardList()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpdateUser = (name, about) => {
    (async () => {
      await api
        .editProfile(name, about)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api
        .avatarPhoto(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleAddPlaceSubmit = (name, link) => {
    (async () => {
      await api
        .addCard(name, link)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  //lógica para login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          // Guardar token en localStorage

          localStorage.setItem("token", data.token);
          api.headers.authorization = `Bearer ${data.token}`;

          // Actualizar estado de autenticación
          setIsLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error en login:", err);
      });
  };

  useEffect(() => {
    async function handleCheckToken() {
      if (localStorage.getItem("token")) {
        try {
          const tokenFromStorage = localStorage.getItem("token");
          const response = await checkToken(tokenFromStorage);
          if (response.data) {
            setIsLoggedIn(true);
            navigate("/");
            setToken(tokenFromStorage);
            setCurrentUser(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    handleCheckToken();
  }, [isLoggedIn, navigate]);

  //logica para register
  const handleRegister = (email, password) => {
    register(email, password)
      .then((data) => {
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipMessage("Registro exitoso");
        setIsSuccessInfoTooltip(true);

        // Después del registro exitoso, se hace login automáticamente
        return handleLogin(email, password);
      })
      .catch((err) => {
        setIsSuccessInfoTooltip(false);
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipMessage("Error en el Registro");
        console.log("Error en registro:", err);
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <Routes>
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="page">
                {<Header />}

                {
                  <Main
                    currentUser={currentUser}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlace}
                    onEditAvatarClick={handleEditAvatarClick}
                    isEditProfilePopupOpen={isEditProfilePopupOpen}
                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                    isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  />
                }
                {popup === "add-place" && (
                  <AddPlace onAddPlaceSubmit={handleAddPlaceSubmit} />
                )}

                {<Footer />}
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={handleCloseInfoTooltip}
        isSuccess={isSuccessInfoTooltip}
        message={isInfoTooltipMessage}
      ></InfoTooltip>
    </CurrentUserContext.Provider>
  );
}

export default App;
