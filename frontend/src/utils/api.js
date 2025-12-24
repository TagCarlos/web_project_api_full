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
            headers: {
                ...this.headers,
                Authorization: `Bearer ${token}`
            }

        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });
    };

    getCardList() {
        const token = localStorage.getItem('token');
        return fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: {
                ...this.headers,
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    };

    editProfile(name, about) {
        const token = localStorage.getItem('token');
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                ...this.headers,
                Authorization: `Bearer ${token}`
            },
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
        const token = localStorage.getItem('token');
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: {
                ...this.headers,
                Authorization: `Bearer ${token}`
            },
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
        const token = localStorage.getItem('token');
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                ...this.headers,
                Authorization: `Bearer ${token}`
            }

        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    };


    addLike(cardId, isLiked) {
        const token = localStorage.getItem('token');
        if (isLiked) {
            return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: {
                    ...this.headers,
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                });
        }
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {

            method: "DELETE",
            headers: {
                ...this.headers,
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    };

    avatarPhoto(avatar) {
        const token = localStorage.getItem('token');
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                ...this.headers,
                Authorization: `Bearer ${token}`
            },
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