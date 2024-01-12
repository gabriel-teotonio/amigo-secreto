import { getToday } from "../utils/getToday"

// A senha será a data atual ex:08122023
export const validatePasswword = (password: string): boolean => {
   const currentPassword = getToday().split("/").join("")
   return currentPassword === password
}

export const createToken = () => {
   const currentPassword = getToday().split("/").join("")
   return `${process.env.DEFAULT_TOKEN}${currentPassword}`
}

export const validateToken = (token: string) => {
   const currentToken = createToken()
   return token === currentToken
}