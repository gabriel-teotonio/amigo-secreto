import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http"
import https from "https"
import siteRoutes from "./routes/site"
import adminRoutes from "./routes/admin"
import { requestIntercepter } from "./utils/requestIntercepter";
import fs from "fs"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// todas os endpoints passarão pelo intercepter
app.use("*", requestIntercepter)

app.use("/", siteRoutes)
app.use("/admin", adminRoutes)

const runServer = (port: number, server: http.Server) => {
   server.listen(port, () => {
      console.log(`🚀 Running at PORT ${port}`)
   })
}

const regularServer = http.createServer(app)
if(process.env.NODE_ENV === "production"){
   const secServer = https.createServer(app)
   runServer(80,regularServer)
   runServer(443,secServer)
}else{
   const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000
   runServer(serverPort, regularServer)
}
