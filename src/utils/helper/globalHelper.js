import { getCookie } from "./cookieHelper"

export const authorization = () => {
    return {
        headers: { Authorization: `Bearer ` + getCookie('token') }
    }
}

export const isAuthenticated = () => {
    if(!getCookie('token')) return false;
    return true;
}