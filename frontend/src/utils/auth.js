const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';


export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Error: ${response.status}`);
        });
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Error: ${response.status}`);
        });
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Error: ${response.status}`);
        });
};

//middleware para la autorización
export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.substring(7);
    let payload;

    try {
        payload = jwt.verify(token, "secretpassword");
    } catch (error) {
        return res.status(401).json({ message: "Se requiere autorizacion" })
    }
    req.user = payload;
    next();
}

