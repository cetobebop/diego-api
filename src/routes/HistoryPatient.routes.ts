import  HistoryPatientControllers  from "@controllers/HistoryPatient.controllers";
import { Router } from "express";
import { requireToken } from "@middlewares/requireToken";

const router = Router()

router.get('/history_patient/:id',
  (req,res,next)=>{
    requireToken(req,res, next)
  },
  (req ,res)=>{
    HistoryPatientControllers.getHisPatById(req, res)
  }
)

router.get('/history_patient_by_patient_id/:id',
  (req,res,next)=>{
    requireToken(req,res, next)
  },
  (req ,res)=>{
    HistoryPatientControllers.getHisPatByPatientId(req, res)
  }
)


export default router
