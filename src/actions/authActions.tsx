import IUser from '../interfaces/IUser'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function login(token:any, googleAccessToken:any, user:IUser) {
    return (dispath:any) => {
        dispath({
            type: LOGIN,
            payload: {token, googleAccessToken, user}
        });
    }
}

export function logout() {
    console.log("Logging out");
    return (dispath:any) => {
        dispath({
            type: LOGOUT,
            payload: ""
        });
    };
}