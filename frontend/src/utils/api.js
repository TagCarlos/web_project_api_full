class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        // cuerpo del constructor
    }
    getUserInfo() {
        const token = localStorage.getItem('token');

        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers
            /* "Authorization": `Bearer ${token}` */

        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });
    };

    getCardList() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    };

    editProfile(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name,
                about,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    }

    addCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,

        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    };


    addLike(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this.headers,
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                });
        }
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    };

    avatarPhoto(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    };

}



export { Api };