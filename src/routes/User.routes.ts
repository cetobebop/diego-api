import { Router } from "express";
import { requireToken } from "@middlewares/requireToken";
import { IRequest, IResponse } from "types/RequestAndResponse";



const router = Router()

//router.post('/users', AuthControllers.register(req,res)) da error de tipado 
// por que los parametros no coinciden por algun motivo, aunque no le encuentro sentido

router.post('/user',
   (req,res,next)=>{
     requireToken(req,res, next)
   },
   (req ,res)=>{
    epa(req,res)
})


function epa(req:IRequest ,res:IResponse){
    console.log(req.body)
    return res.send('ok')
}



export default router
