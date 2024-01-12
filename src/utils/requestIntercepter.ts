import { RequestHandler } from "express";

// Interceptador para ver informações da requisição feita
export const requestIntercepter: RequestHandler = (req, res, next) => {
   console.log(`➡️  ${res.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`)
   next()
}