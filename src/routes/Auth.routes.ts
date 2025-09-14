import { Router } from "express";

import AuthControllers from "@controllers/Auth.controllers";
import { requireRefreshToken } from "middlewares/requireRefreshToken";

const router = Router()

//router.post('/users', AuthControllers.register(req,res)) da error de tipado 
// por que los parametros no coinciden por algun motivo, aunque no le encuentro sentido

router.post('/register', (req,res)=>{
    AuthControllers.register(req,res)
})


router.post('/login', (req,res)=>{
    AuthControllers.login(req,res)
})


router.post('/refresh_token', (req,res,next)=>{
    requireRefreshToken(req,res,next)

},(req, res)=>{
    AuthControllers.refreshToken(req,res)
})

router.get('/logout', (req,res)=>{
    AuthControllers.clearCookies(req,res)
})


export default router
