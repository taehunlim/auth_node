import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    if(window !== "undefined") {
        cookie.set(key, value, {
            expires: 7
        })
    }
};

export const getCookie = key => {
    if(window !== "undefined") {
        return cookie.get(key)
    }
};

export const setLocalStorage = (key, value) => {
    if(window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value))
    }
};

export const authenticate = (response, next) => {
    setCookie('jwtToken', response.data.jwtToken)
    setLocalStorage('user', response.data)
    next();
}

export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('jwtToken')
        if(cookieChecked) {
            return JSON.parse(localStorage.getItem('user'))
        }
    }
}
