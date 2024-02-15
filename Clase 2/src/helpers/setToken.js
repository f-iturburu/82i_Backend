export const setToken = (token) =>{
    localStorage.setItem("auth-token", JSON.stringify(token))
}